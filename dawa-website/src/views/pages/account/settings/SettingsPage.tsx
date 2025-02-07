'use client';

import { useState, useRef, useEffect } from 'react';
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
import { useAuth } from '@/@core/hooks/use-auth';

interface FileWithPreview extends File {
  preview?: string;
}

interface ProfileFormData {
  // Displayed but not updated.
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  // Updatable fields
  address: string;
  user_national_id_or_passport: string;
}

export default function SettingsPage() {
  // Fetch profile data from context
  const { userProfile, mutate, isLoading } = useProfile();
  const { updateUserProfile, isLoading: isUpdating } = useUpdateUserProfile();
  const { changeUserPassword, isLoading: isChangingPassword } =
    useChangeUserPassword();
  const { logout } = useAuth();

  // Ref to store initial values (used for comparing updates)
  const initialFormData = useRef<ProfileFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    user_national_id_or_passport: '',
  });

  // Form data state (includes both disabled and updatable fields)
  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    user_national_id_or_passport: '',
  });

  // Initialize form values when userProfile is loaded
  useEffect(() => {
    if (userProfile) {
      const initialValues: ProfileFormData = {
        firstName: userProfile.user.first_name || '',
        lastName: userProfile.user.last_name || '',
        email: userProfile.user.email || '',
        phone: userProfile.contact || '',
        address: userProfile.address || '',
        user_national_id_or_passport:
          userProfile.user_national_id_or_passport || '',
      };
      setFormData(initialValues);
      initialFormData.current = initialValues;
    }
  }, [userProfile]);

  // State for handling file uploads with preview URLs
  const [files, setFiles] = useState<{
    user_profile_picture?: FileWithPreview;
    scanned_national_id_or_passport_document?: FileWithPreview;
  }>({});

  // Password form state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Refs for hidden file inputs
  const fileInputRefs = {
    profile: useRef<HTMLInputElement>(null),
    scanned: useRef<HTMLInputElement>(null),
  };

  // Handle file selection and create preview URL
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileWithPreview = file as FileWithPreview;
      fileWithPreview.preview = URL.createObjectURL(file);
      setFiles((prev) => ({
        ...prev,
        [field]: fileWithPreview,
      }));
    }
  };

  // Handle input changes for text fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  // Handle input changes for password fields
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  // Remove a selected file and revoke its preview URL
  const removeFile = (field: string) => {
    setFiles((prev) => {
      const newFiles = { ...prev };
      if (newFiles[field as keyof typeof newFiles]?.preview) {
        URL.revokeObjectURL(newFiles[field as keyof typeof newFiles]!.preview!);
      }
      delete newFiles[field as keyof typeof newFiles];
      return newFiles;
    });
  };

  // Handler to update user profile
  // Only the following fields can be updated:
  // - user_profile_picture
  // - user_national_id_or_passport
  // - address
  // - scanned_national_id_or_passport_document
  const handleProfileUpdate = async () => {
    try {
      const formDataToSend = new FormData();

      // Append file fields if available.
      if (files.user_profile_picture) {
        formDataToSend.append(
          'user_profile_picture',
          files.user_profile_picture,
        );
      }
      if (files.scanned_national_id_or_passport_document) {
        formDataToSend.append(
          'scanned_national_id_or_passport_document',
          files.scanned_national_id_or_passport_document,
        );
      }

      // Append only updatable text fields if they are non-empty and changed.
      const fieldsToUpdate: (keyof Pick<
        ProfileFormData,
        'address' | 'user_national_id_or_passport'
      >)[] = ['address', 'user_national_id_or_passport'];
      fieldsToUpdate.forEach((key) => {
        const value = formData[key];
        const originalValue = initialFormData.current[key];
        if (value && value !== originalValue) {
          formDataToSend.append(key, value);
        }
      });

      // If nothing changed, notify and return.
      if (Array.from(formDataToSend.keys()).length === 0) {
        toast.info('No changes to update');
        return;
      }

      // Call the API mutation hook (which uses PATCH)
      await updateUserProfile(formDataToSend);

      // Optimistically update SWR.
      (mutate as any)((prev: any) => {
        if (!prev || !prev.user_profile) return prev;
        return {
          ...prev,
          user_profile: {
            ...prev.user_profile,
            address: formData.address,
            user_national_id_or_passport: formData.user_national_id_or_passport,
            ...(files.user_profile_picture && {
              user_profile_picture: files.user_profile_picture.preview,
            }),
            ...(files.scanned_national_id_or_passport_document && {
              scanned_national_id_or_passport_document:
                files.scanned_national_id_or_passport_document.preview,
            }),
          },
        };
      }, false);

      toast.success('Profile updated successfully');

      // Clear file state and revoke previews.
      Object.values(files).forEach((file) => {
        if (file?.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
      setFiles({});
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  // Handler to update password.
  // NOTE: The payload is sent as JSON and now includes confirm_password.
  const handlePasswordUpdate = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      // Send the password update payload as JSON.
      await changeUserPassword({
        old_password: passwordData.currentPassword,
        new_password: passwordData.newPassword,
        confirm_password: passwordData.confirmPassword,
      });
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      toast.success('Password changed successfully');
      logout();
    } catch (error) {
      toast.error('Failed to change password');
    }
  };

  // Utility to get user initials for the avatar fallback
  const getInitials = () => {
    return formData.firstName ? formData.firstName.charAt(0).toUpperCase() : '';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="mb-4 md:mb-0">
          <h2 className="text-3xl font-bold text-gray-800">Account Settings</h2>
          <p className="text-gray-600">
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
        <TabsList className="grid grid-cols-1 sm:grid-cols-3 gap-2 h-auto">
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
                <div className="flex justify-center">
                  <div className="relative">
                    <Avatar className="w-24 h-24">
                      <AvatarImage
                        src={
                          files.user_profile_picture?.preview ||
                          userProfile?.user_profile_picture ||
                          undefined
                        }
                        alt={`${formData.firstName} ${formData.lastName}`}
                      />
                      <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                        {getInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="icon"
                      type="button"
                      onClick={() => fileInputRefs.profile.current?.click()}
                      className="absolute bottom-0 right-0 rounded-full bg-primary hover:bg-primary/90 shadow-lg"
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

                {/* Disabled fields */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      disabled
                      className="h-10 cursor-not-allowed"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      disabled
                      className="h-10 cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      disabled
                      className="h-10 cursor-not-allowed"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      disabled
                      className="h-10 cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Updatable fields */}
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="h-10"
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="user_national_id_or_passport">
                    National ID or Passport Number
                  </Label>
                  <Input
                    id="user_national_id_or_passport"
                    value={formData.user_national_id_or_passport}
                    onChange={handleInputChange}
                    placeholder="Enter your ID or passport number"
                    className="h-10"
                    disabled={isLoading}
                  />
                  <p className="text-sm text-muted-foreground">
                    Please enter your valid identification number
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Scanned Document</Label>
                  <div className="border rounded-lg p-4 space-y-4">
                    {files.scanned_national_id_or_passport_document ? (
                      <div className="flex items-center justify-between p-2 bg-muted rounded-md">
                        <div className="flex items-center space-x-2">
                          <FileText className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium">
                            {
                              files.scanned_national_id_or_passport_document
                                .name
                            }
                          </span>
                        </div>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
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
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="h-8 w-8 mb-2 text-primary" />
                          <p className="mb-2 text-sm text-muted-foreground">
                            <span className="font-semibold">
                              Click to upload
                            </span>{' '}
                            or drag and drop
                          </p>
                          <p className="text-xs text-muted-foreground">
                            PDF, PNG, or JPG (max. 10MB)
                          </p>
                        </div>
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
                    <p className="text-sm text-muted-foreground">
                      Upload a scanned copy of your National ID or Passport
                    </p>
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
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className="h-10"
                    autoComplete="current-password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="h-10"
                    autoComplete="new-password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className="h-10"
                    autoComplete="new-password"
                  />
                </div>
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
                      <p className="text-sm text-gray-500">
                        Receive notifications via email
                      </p>
                    </div>
                    <Switch id="email-notifications" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="sms-notifications">
                        SMS Notifications
                      </Label>
                      <p className="text-sm text-gray-500">
                        Receive notifications via SMS
                      </p>
                    </div>
                    <Switch id="sms-notifications" />
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
