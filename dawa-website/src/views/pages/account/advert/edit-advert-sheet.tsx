'use client';

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  useUpdateProduct,
  useDeleteItemImage,
} from '@core/hooks/useProductData';
import { toast } from 'sonner';
import { X, Loader2, ImageIcon, Upload } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { selectCategories } from '@/redux-store/slices/categories/categories';
import CategorySelect from '@/components/shared/CategorySelect';

interface EditAdvertSheetProps {
  isOpen: boolean;
  onClose: () => void;
  item: any;
  onUpdate: () => void;
}

interface FormDataState {
  item_id: number;
  item_name: string;
  item_price: number;
  // Change this key name so that it matches what your backend expects.
  item_subcategory: number | null;
  item_description: string;
  item_location: string;
  item_negotiable: boolean;
}

export function EditAdvertSheet({
  isOpen,
  onClose,
  item,
  onUpdate,
}: EditAdvertSheetProps) {
  const { updateProduct, isLoading: isUpdating } = useUpdateProduct();
  const { deleteItemImage, isMutating: isDeleting } = useDeleteItemImage();
  const [deleteImageId, setDeleteImageId] = useState<number | null>(null);

  // Initialize form data using the new key name.
  const [formData, setFormData] = useState<FormDataState>({
    item_id: item.id,
    item_name: item.name,
    item_price: item.price,
    // Use the provided subcategory id if available; otherwise null.
    item_subcategory: item.subcategory_id ? Number(item.subcategory_id) : null,
    item_description: item.description,
    item_location: item.location,
    item_negotiable: item.item_negotiable,
  });
  const [images, setImages] = useState(item.images || []);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const categories = useSelector(selectCategories);

  // If the item doesn't have a valid subcategory id but has a subcategory name,
  // search the categories list and update the form state.
  useEffect(() => {
    if (
      !formData.item_subcategory &&
      item.subcategory &&
      Array.isArray(categories) &&
      categories.length > 0
    ) {
      for (const category of categories) {
        if (category.subcategories && category.subcategories.length > 0) {
          const match = category.subcategories.find(
            (sub: { id: string; subcategory_name: string }) =>
              sub.subcategory_name.toLowerCase() ===
              item.subcategory.toLowerCase(),
          );
          if (match) {
            setFormData((prev) => ({
              ...prev,
              item_subcategory: Number(match.id),
            }));
            break;
          }
        }
      }
    }
  }, [item.subcategory, formData.item_subcategory, categories]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'item_price' ? Number(value) : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Convert the string value from CategorySelect into a number.
  const handleCategoryChange = (subcategoryId: string) => {
    setFormData((prev) => ({
      ...prev,
      item_subcategory: Number(subcategoryId),
    }));
    if (errors.item_subcategory) {
      setErrors((prev) => ({ ...prev, item_subcategory: '' }));
    }
  };

  const handleDeleteImage = async (imageId: number) => {
    try {
      await deleteItemImage({ image_id: imageId });
      setImages(images.filter((img: any) => img.image_id !== imageId));
      toast.success('Image deleted successfully');
      setDeleteImageId(null);
    } catch (error) {
      toast.error('Failed to delete image');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewImages((prev) => [
        ...prev,
        ...Array.from(e.target.files as FileList),
      ]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.item_subcategory) {
      setErrors((prev) => ({
        ...prev,
        item_subcategory: 'Please select a valid category',
      }));
      toast.error('Please select a valid category');
      return;
    }

    try {
      const form = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        // Check if the value is a boolean and convert accordingly.
        if (typeof value === 'boolean') {
          form.append(key, value ? 'True' : 'False');
        } else {
          form.append(key, value?.toString() || '');
        }
      });

      newImages.forEach((file, index) => {
        form.append(`images[${index}]`, file);
      });

      await updateProduct(form);
      toast.success('Advert updated successfully');
      onUpdate();
      onClose();
    } catch (error: any) {
      toast.error('Failed to update advert');
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      }
    }
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-xl overflow-y-auto"
        >
          <SheetHeader className="space-y-2 mb-6">
            <SheetTitle>Edit Advert</SheetTitle>
            <SheetDescription>
              Make changes to your advert here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Images Section */}
            <div className="space-y-4">
              <Label>Current Images</Label>
              <div className="grid grid-cols-2 gap-4">
                <AnimatePresence>
                  {images.map((image: any) => (
                    <motion.div
                      key={image.image_id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                      className="relative group aspect-square"
                    >
                      <img
                        src={image.image_url || '/placeholder.svg'}
                        alt={formData.item_name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <Button
                        size="icon"
                        variant="destructive"
                        className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => setDeleteImageId(image.image_id)}
                        disabled={isDeleting}
                      >
                        {isDeleting ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <X className="h-4 w-4" />
                        )}
                      </Button>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {images.length === 0 && (
                  <div className="col-span-2 flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg text-muted-foreground">
                    <ImageIcon className="h-8 w-8 mb-2" />
                    <p className="text-sm">No images available</p>
                  </div>
                )}
              </div>
            </div>

            {/* New Images Upload */}
            <div className="space-y-4">
              <Label htmlFor="new-images">Add New Images</Label>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="new-images"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG or WEBP (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    id="new-images"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
              {newImages.length > 0 && (
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {newImages.map((file, index) => (
                    <div key={index} className="relative group aspect-square">
                      <img
                        src={URL.createObjectURL(file) || '/placeholder.svg'}
                        alt={`New upload ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <Button
                        size="icon"
                        variant="destructive"
                        className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() =>
                          setNewImages(newImages.filter((_, i) => i !== index))
                        }
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="item_subcategory">Category</Label>
                <CategorySelect
                  categories={(categories as any) || []}
                  // Convert the numeric subcategory id (or null) to a string
                  value={
                    formData.item_subcategory !== null
                      ? formData.item_subcategory.toString()
                      : ''
                  }
                  // onChange receives a string then converts it to a number
                  onChange={handleCategoryChange}
                  errors={errors.item_subcategory}
                />
              </div>

              <div>
                <Label htmlFor="item_name">Title</Label>
                <Input
                  id="item_name"
                  name="item_name"
                  value={formData.item_name}
                  onChange={handleInputChange}
                  className="mt-1.5"
                  required
                />
                {errors.item_name && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.item_name}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="item_price">Price (UGX)</Label>
                <Input
                  id="item_price"
                  name="item_price"
                  type="number"
                  value={formData.item_price}
                  onChange={handleInputChange}
                  className="mt-1.5"
                  required
                />
                {errors.item_price && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.item_price}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="item_location">Location</Label>
                <Input
                  id="item_location"
                  name="item_location"
                  value={formData.item_location}
                  onChange={handleInputChange}
                  className="mt-1.5"
                  required
                />
                {errors.item_location && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.item_location}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="item_description">Description</Label>
                <Textarea
                  id="item_description"
                  name="item_description"
                  value={formData.item_description}
                  onChange={handleInputChange}
                  className="mt-1.5 min-h-[100px]"
                  required
                />
                {errors.item_description && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.item_description}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="item_negotiable">Negotiable</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow buyers to negotiate the price
                  </p>
                </div>
                <Switch
                  id="item_negotiable"
                  name="item_negotiable"
                  checked={formData.item_negotiable}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      item_negotiable: checked,
                    }))
                  }
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isUpdating}>
                {isUpdating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>

      <AlertDialog
        open={!!deleteImageId}
        onOpenChange={() => setDeleteImageId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Image</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this image? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteImageId && handleDeleteImage(deleteImageId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
