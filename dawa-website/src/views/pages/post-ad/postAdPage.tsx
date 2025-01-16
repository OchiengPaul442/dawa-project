'use client';

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { PencilIcon, DollarSignIcon } from 'lucide-react';
import InputField from '@/views/auth/InputField';
import CategorySelect from './CategorySelect';
import ImageUpload from './ImageUpload';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAddNewProduct, useCategories } from '@core/hooks/useProductData';
import { locations } from '@/data/locations';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ProductUploadProps } from '@/types/product';

// Define proper types for the form values
type FormValues = {
  item_name: string;
  item_price: number;
  item_subcategory_id: string;
  item_description: string;
  location: string;
  negotiation: boolean | null;
  images: File[];
};

// Create a schema that matches the FormValues type
const schema: yup.ObjectSchema<FormValues> = yup
  .object({
    item_name: yup.string().required('Item name is required'),
    item_price: yup
      .number()
      .typeError('Price must be a number')
      .required('Price is required'),
    item_subcategory_id: yup
      .string()
      .required('Category selection is required'),
    item_description: yup.string().required('Description is required'),
    location: yup.string().required('Location is required'),
    negotiation: yup
      .boolean()
      .nullable()
      .required('Please indicate if negotiation is open'),
    images: yup.array().of(yup.mixed<File>().required()).default([]),
  })
  .required();

export default function PostAdPage() {
  const { categories, isLoading } = useCategories();
  const { addProduct, isAdding, error } = useAddNewProduct();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      item_name: '',
      item_price: 0,
      item_subcategory_id: '',
      item_description: '',
      location: '',
      negotiation: null,
      images: [],
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto py-10 px-4 flex items-center justify-center">
        <p className="text-lg font-semibold">Loading categories...</p>
      </div>
    );
  }

  const onSubmit = async (data: FormValues) => {
    try {
      // Convert the data to the format expected by the API
      const payload: ProductUploadProps = {
        item_name: data.item_name,
        item_price: String(data.item_price),
        item_subcategory_id: data.item_subcategory_id,
        item_description: data.item_description,
        item_location: data.location,
        item_negotiable: data.negotiation,
        images: data.images,
      };

      console.log('Submitting product with payload:', payload);

      await addProduct(payload);
      reset();
      setSuccessMessage('Your ad has been posted successfully!');
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (err) {
      console.error('Failed to add product:', err);
    }
  };

  return (
    <div className="container mx-auto min-h-screen py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="border-b bg-gray-50/50">
            <CardTitle className="text-2xl font-bold text-center">
              Post Your Free Ad
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Item Name */}
              <InputField
                label="Item Name"
                icon={PencilIcon}
                placeholder="Enter item name"
                errors={errors.item_name?.message}
                {...register('item_name')}
              />

              {/* Price */}
              <InputField
                label="Price (UGX)"
                type="number"
                // icon={}
                placeholder="Enter price"
                errors={errors.item_price?.message}
                {...register('item_price')}
              />

              {/* Category Select */}
              <Controller
                name="item_subcategory_id"
                control={control}
                render={({ field }) => (
                  <div className="space-y-2">
                    <label className="block font-semibold text-gray-700">
                      Category
                    </label>
                    <CategorySelect
                      categories={categories}
                      onChange={field.onChange}
                      value={field.value}
                      errors={errors.item_subcategory_id?.message}
                    />
                  </div>
                )}
              />

              {/* Location Select */}
              <div className="space-y-2">
                <label className="block font-semibold text-gray-700">
                  Location
                </label>
                <select
                  {...register('location')}
                  className="w-full h-14 border rounded-lg focus:border-primary_1 focus:outline-none"
                >
                  <option value="" disabled>
                    Select a location
                  </option>
                  {locations.map((loc, index) => (
                    <option key={index} value={loc.name}>
                      {loc.name}
                    </option>
                  ))}
                </select>
                {errors.location && (
                  <p className="text-sm text-red-500">
                    {errors.location.message}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="block font-semibold text-gray-700">
                  Description
                </label>
                <Textarea
                  {...register('item_description')}
                  className="min-h-[120px] resize-none"
                  placeholder="Describe your item in detail..."
                />
                {errors.item_description && (
                  <p className="text-sm text-red-500">
                    {errors.item_description.message}
                  </p>
                )}
              </div>

              {/* Negotiation */}
              <Controller
                name="negotiation"
                control={control}
                render={({ field }) => (
                  <div className="space-y-2">
                    <div className="flex flex-col gap-4">
                      <Label className="block text-sm font-semibold text-gray-700">
                        Are you open to negotiation?
                      </Label>
                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2">
                          <Checkbox
                            checked={field.value === true}
                            onCheckedChange={(checked) => {
                              field.onChange(checked ? true : null);
                            }}
                            className="border-orange-500 text-orange-500"
                          />
                          Yes
                        </label>
                        <label className="flex items-center gap-2">
                          <Checkbox
                            checked={field.value === false}
                            onCheckedChange={(checked) => {
                              field.onChange(checked ? false : null);
                            }}
                            className="border-orange-500 text-orange-500"
                          />
                          No
                        </label>
                      </div>
                    </div>
                    {errors.negotiation && (
                      <p className="text-sm text-red-500">
                        {errors.negotiation.message}
                      </p>
                    )}
                  </div>
                )}
              />

              {/* Image Upload */}
              <Controller
                name="images"
                control={control}
                render={({ field }) => (
                  <ImageUpload
                    onUpload={(files: File[]) => {
                      field.onChange(files);
                    }}
                    images={field.value}
                    maxImages={5}
                  />
                )}
              />

              {/* Error and Success Messages */}
              {error && (
                <p className="text-red-500 text-center">
                  Error: {typeof error === 'string' ? error : error.message}
                </p>
              )}
              {successMessage && (
                <p className="text-green-500 text-center">{successMessage}</p>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isAdding}
                className="w-full mt-6 h-12 bg-primary_1 text-white py-3 rounded-md font-bold hover:bg-primary_1-dark transition-colors"
              >
                {isAdding ? 'Posting...' : 'Post Ad'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
