'use client';

import { useState, useRef, useEffect } from 'react';
import useSWR from 'swr';
import { useProfile } from '@/contexts/profile-context';
import {
  useUpdateUserProfile,
  useChangeUserPassword,
} from '@core/hooks/useProductData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Camera, Loader2, Upload, FileText, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileData {
  name: string;
  preview: string | null;
  file: File | null;
}

const initialFormData: any = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  user_national_id_or_passport: '',
  user_profile_picture: null,
  scanned_national_id_or_passport: '',
};

export default function SettingsPage() {
  const { userProfile, isLoading: isProfileLoading, mutate } = useProfile();
  const { updateUserProfile, isLoading: isUpdating } = useUpdateUserProfile();
  const { changeUserPassword, isLoading: isChangingPassword } =
    useChangeUserPassword();
  const [formData, setFormData] = useState<any>(initialFormData);
  const [originalData, setOriginalData] = useState<any>(initialFormData);
  const [passwordData, setPasswordData] = useState<any>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [files, setFiles] = useState<{
    user_profile_picture: FileData | null;
    scanned_national_id_or_passport_document: FileData | null;
  }>({
    user_profile_picture: null,
    scanned_national_id_or_passport_document: null,
  });
  const fileInputRefs = {
    profile: useRef<HTMLInputElement>(null),
    scanned: useRef<HTMLInputElement>(null),
  };

  // Map the fetched user profile data to the form and original state.
  useEffect(() => {
    if (userProfile) {
      const mappedData = {
        id: userProfile.id || '',
        firstName: userProfile.user?.first_name || '',
        lastName: userProfile.user?.last_name || '',
        email: userProfile.user?.email || '',
        phone: userProfile.contact || '',
        address: userProfile.address || '',
        user_national_id_or_passport:
          userProfile.user_national_id_or_passport || '',
        user_profile_picture: userProfile.user_profile_picture || null,
        scanned_national_id_or_passport:
          userProfile.scanned_national_id_or_passport || '',
      };

      setFormData(mappedData);
      setOriginalData(mappedData);
    }
  }, [userProfile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({ ...passwordData, [e.target.id]: e.target.value });
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string,
  ) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();

    if (file) {
      reader.onload = (event) => {
        setFiles((prevFiles) => ({
          ...prevFiles,
          [field]: {
            name: file.name,
            preview: event.target?.result as string,
            file,
          },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeFile = (field: string) => {
    setFiles((prevFiles) => ({ ...prevFiles, [field]: null }));
  };

  const handleProfileUpdate = async () => {
    if (isUpdating) return;

    // Build a diff object for changed text fields.
    const changedData: any = {};
    Object.keys(formData).forEach((key) => {
      if (key === 'id') return;
      if (formData[key] !== originalData[key] && formData[key] !== '') {
        changedData[key] = formData[key];
      }
    });

    // Check if file changes exist.
    if (files.user_profile_picture?.file) {
      changedData.user_profile_picture = files.user_profile_picture.file;
    }
    if (files.scanned_national_id_or_passport_document?.file) {
      changedData.scanned_national_id_or_passport_document =
        files.scanned_national_id_or_passport_document.file;
    }

    // If no changes have been made, show a toast and exit.
    if (Object.keys(changedData).length === 0) {
      toast('No changes to update.');
      return;
    }

    // Create a FormData payload.
    const payload = new FormData();
    Object.keys(changedData).forEach((key) => {
      payload.append(key, changedData[key]);
    });

    try {
      await updateUserProfile(payload);
      // Trigger SWR to revalidate and fetch the updated data.
      mutate();
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const handlePasswordUpdate = async () => {
    if (isChangingPassword) return;
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }
    try {
      await changeUserPassword(passwordData);
      toast.success('Password changed successfully!');
    } catch (error) {
      toast.error('Failed to change password');
    }
  };

  const getInitials = () => {
    const name = `${formData.firstName}`.toUpperCase();
    return name.match(/\b\w/g)?.join('') || '';
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Account Settings</h1>
          <p className="text-muted-foreground">
            Manage your account preferences and information
          </p>
        </div>
        <Button
          variant="outline"
          onClick={handleProfileUpdate}
          disabled={isUpdating}
          className={cn(
            'h-10',
            isUpdating
              ? 'text-muted-foreground border-muted-foreground'
              : 'text-green-500 border-green-500',
          )}
        >
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

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid grid-cols-1 bg-slate-300/50 sm:grid-cols-3 gap-2 mb-8 h-auto">
          <TabsTrigger value="personal" className="h-10">
            Personal Info
          </TabsTrigger>
          <TabsTrigger value="security" className="h-10">
            Security
          </TabsTrigger>
          <TabsTrigger value="notifications" className="h-10">
            Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                {/* Avatar upload */}
                <div className="flex justify-center">
                  <div className="relative">
                    <Avatar className="w-24 h-24">
                      <AvatarImage
                        src={
                          files.user_profile_picture?.preview ||
                          formData.user_profile_picture ||
                          undefined
                        }
                        alt={`${formData.firstName} ${formData.lastName}`}
                      />
                      <AvatarFallback>{getInitials()}</AvatarFallback>
                    </Avatar>
                    <Button
                      size="icon"
                      type="button"
                      onClick={() => fileInputRefs.profile.current?.click()}
                      className="absolute bottom-0 right-0 rounded-full bg-primary hover:bg-primary/90"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                    <input
                      ref={fileInputRefs.profile}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleFileChange(e, 'user_profile_picture')
                      }
                    />
                  </div>
                </div>

                {/* Personal information fields */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <FormField
                    label="First Name"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    disabled
                  />
                  <FormField
                    label="Last Name"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    disabled
                  />
                  <FormField
                    label="Email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    type="email"
                    disabled
                  />
                  <FormField
                    label="Phone Number"
                    id="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    type="tel"
                    disabled
                  />
                  <FormField
                    label="Address"
                    id="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    disabled={isProfileLoading}
                  />
                  <FormField
                    label="National ID or Passport Number"
                    id="user_national_id_or_passport"
                    value={formData.user_national_id_or_passport}
                    onChange={handleInputChange}
                    disabled={isProfileLoading}
                  />
                </div>

                {/* Document upload */}
                <div className="space-y-2">
                  <Label>Scanned Document</Label>
                  <div className="border rounded-lg p-4 space-y-4">
                    {files.scanned_national_id_or_passport_document ? (
                      <div className="relative">
                        {files.scanned_national_id_or_passport_document.file &&
                        files.scanned_national_id_or_passport_document.file.type.startsWith(
                          'image/',
                        ) ? (
                          <img
                            src={
                              files.scanned_national_id_or_passport_document
                                .preview || ''
                            }
                            alt="Uploaded document preview"
                            className="max-h-48 object-contain rounded-md w-full"
                          />
                        ) : (
                          <div className="flex items-center space-x-2 p-2">
                            <FileText className="h-6 w-6 text-primary" />
                            <span className="text-sm font-medium">
                              {
                                files.scanned_national_id_or_passport_document
                                  .name
                              }
                            </span>
                          </div>
                        )}
                        <Button
                          size="icon"
                          variant="ghost"
                          className="absolute top-0 right-0"
                          onClick={() =>
                            removeFile(
                              'scanned_national_id_or_passport_document',
                            )
                          }
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-4 border-2 border-dashed rounded-lg">
                        <Upload className="h-8 w-8 mb-2 text-primary" />
                        <p className="mb-2 text-sm text-muted-foreground">
                          <span className="font-semibold">Click to upload</span>{' '}
                          or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">
                          PDF, PNG, or JPG (max. 10MB)
                        </p>
                        <Button
                          type="button"
                          variant="outline"
                          className="mt-2"
                          onClick={() => fileInputRefs.scanned.current?.click()}
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Document
                        </Button>
                      </div>
                    )}
                    <input
                      ref={fileInputRefs.scanned}
                      type="file"
                      accept=".pdf,image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleFileChange(
                          e,
                          'scanned_national_id_or_passport_document',
                        )
                      }
                    />
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                className="space-y-8"
                onSubmit={(e) => {
                  e.preventDefault();
                  handlePasswordUpdate();
                }}
              >
                <FormField
                  label="Current Password"
                  id="currentPassword"
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                />
                <FormField
                  label="New Password"
                  id="newPassword"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                />
                <FormField
                  label="Confirm New Password"
                  id="confirmPassword"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                />
                <Button
                  type="submit"
                  disabled={isChangingPassword}
                  className="w-full"
                >
                  {isChangingPassword ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Changing Password...
                    </>
                  ) : (
                    'Change Password'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-notifications">
                        Email Notifications
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via email
                      </p>
                    </div>
                    <Switch disabled={true} id="email-notifications" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="sms-notifications">
                        SMS Notifications
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via SMS
                      </p>
                    </div>
                    <Switch disabled={true} id="sms-notifications" />
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface FormFieldProps {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  disabled?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  id,
  value,
  onChange,
  type = 'text',
  disabled = false,
}) => (
  <div className="space-y-2">
    <Label htmlFor={id}>{label}</Label>
    <Input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={cn('h-10', disabled && 'cursor-not-allowed')}
    />
  </div>
);
