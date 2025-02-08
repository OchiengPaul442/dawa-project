'use client';

import { useState, useRef, useEffect } from 'react';
import { useProfile } from '@/contexts/profile-context';
import {
  useUpdateUserProfile,
  useChangeUserPassword,
} from '@core/hooks/useProductData';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PersonalInfoForm } from './PersonalInfoForm';
import { SecurityForm } from './SecurityForm';
import { NotificationPreferences } from './NotificationPreferences';

// Rename our custom interface to ProfileFormData.
export interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  user_national_id_or_passport: string;
  // Remains a string (or null) for the preview URL
  user_profile_picture: string | null;
}

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface FileData {
  name: string;
  preview: string | null;
  file: File | null;
}

const initialFormData: ProfileFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  user_national_id_or_passport: '',
  user_profile_picture: null,
};

export default function SettingsPage() {
  const { userProfile, isLoading: isProfileLoading, mutate } = useProfile();
  const { updateUserProfile, isLoading: isUpdating } = useUpdateUserProfile();
  const { changeUserPassword, isLoading: isChangingPassword } =
    useChangeUserPassword();
  const [formData, setFormData] = useState<ProfileFormData>(initialFormData);
  const [originalData, setOriginalData] =
    useState<ProfileFormData>(initialFormData);
  const [passwordData, setPasswordData] = useState<PasswordData>({
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

  useEffect(() => {
    if (userProfile) {
      const mappedData: ProfileFormData = {
        firstName: userProfile.user?.first_name || '',
        lastName: userProfile.user?.last_name || '',
        email: userProfile.user?.email || '',
        phone: userProfile.contact || '',
        address: userProfile.address || '',
        user_national_id_or_passport:
          userProfile.user_national_id_or_passport || '',
        user_profile_picture: userProfile.user_profile_picture || null,
      };
      setFormData(mappedData);
      setOriginalData(mappedData);
    }
  }, [userProfile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setPasswordData((prevPasswordData) => ({
      ...prevPasswordData,
      [id]: value,
    }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const preview = event.target?.result as string;
        setFiles((prevFiles) => ({
          ...prevFiles,
          [field]: {
            name: file.name,
            preview,
            file,
          },
        }));
        // For the profile picture, update the formData with the preview URL.
        if (field === 'user_profile_picture') {
          setFormData((prevFormData) => ({
            ...prevFormData,
            user_profile_picture: preview,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeFile = (field: string) => {
    setFiles((prevFiles) => ({ ...prevFiles, [field]: null }));
  };

  const handleProfileUpdate = async () => {
    if (isUpdating) return;

    // Build a payload object that accepts string or File.
    const changedData: { [key: string]: string | File } = {};

    // Loop over the formData keys except for the profile picture
    // (we'll handle that separately)
    Object.keys(formData).forEach((key) => {
      if (key === 'user_profile_picture') return; // Skip this field here
      const value = formData[key as keyof ProfileFormData];
      if (
        value !== originalData[key as keyof ProfileFormData] &&
        value !== '' &&
        value !== null
      ) {
        // Cast the value to string (since our formData stores strings)
        changedData[key] = value as string;
      }
    });

    // If a new profile picture file exists, add it to the payload.
    if (files.user_profile_picture?.file) {
      changedData.user_profile_picture = files.user_profile_picture.file;
    }
    // If a scanned document file exists, add it.
    if (files.scanned_national_id_or_passport_document?.file) {
      changedData.scanned_national_id_or_passport_document =
        files.scanned_national_id_or_passport_document.file;
    }

    if (Object.keys(changedData).length === 0) {
      toast('No changes to update.');
      return;
    }

    const payload = new window.FormData();
    Object.keys(changedData).forEach((key) => {
      const value = changedData[key];
      if (value instanceof File) {
        payload.append(key, value, value.name);
      } else {
        payload.append(key, value);
      }
    });

    try {
      await updateUserProfile(payload);
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

  return (
    <div className="py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Account Settings</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Manage your account preferences and information
          </p>
        </div>
        <Button
          variant="outline"
          onClick={handleProfileUpdate}
          disabled={isUpdating}
          className={cn(
            'w-full sm:w-auto',
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
        <TabsList className="flex flex-wrap justify-start h-auto gap-2 mb-8">
          <div className="bg-slate-300/50 w-auto p-1 rounded-sm">
            <TabsTrigger
              value="personal"
              className="flex-grow sm:flex-grow-0 h-10"
            >
              Personal Info
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="flex-grow sm:flex-grow-0 h-10"
            >
              Security
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="flex-grow sm:flex-grow-0 h-10"
            >
              Notifications
            </TabsTrigger>
          </div>
        </TabsList>

        <TabsContent value="personal">
          <PersonalInfoForm
            formData={formData}
            files={files}
            fileInputRefs={fileInputRefs}
            handleInputChange={handleInputChange}
            handleFileChange={handleFileChange}
            removeFile={removeFile}
            isProfileLoading={isProfileLoading}
          />
        </TabsContent>

        <TabsContent value="security">
          <SecurityForm
            passwordData={passwordData}
            handlePasswordChange={handlePasswordChange}
            handlePasswordUpdate={handlePasswordUpdate}
            isChangingPassword={isChangingPassword}
          />
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationPreferences />
        </TabsContent>
      </Tabs>
    </div>
  );
}
