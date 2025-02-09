import type React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, Upload, FileText, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ProfileFormData } from './SettingsPage';

interface FileData {
  name: string;
  preview: string | null;
  file: File | null;
}

interface PersonalInfoFormProps {
  formData: ProfileFormData;
  files: {
    user_profile_picture: FileData | null;
    scanned_national_id_or_passport_document: FileData | null;
  };
  fileInputRefs: {
    profile: React.RefObject<HTMLInputElement>;
    scanned: React.RefObject<HTMLInputElement>;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string,
  ) => void;
  removeFile: (field: string) => void;
  isProfileLoading: boolean;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  formData,
  files,
  fileInputRefs,
  handleInputChange,
  handleFileChange,
  removeFile,
  isProfileLoading,
}) => {
  const getInitials = () => {
    const name = `${formData.firstName}`.toUpperCase();
    return name.match(/\b\w/g)?.join('') || '';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          {/* Avatar upload */}
          <div className="flex justify-center mb-6">
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
                onChange={(e) => handleFileChange(e, 'user_profile_picture')}
              />
            </div>
          </div>

          {/* Personal information fields */}
          <div className="grid gap-4 sm:grid-cols-2">
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
                    <div className="relative h-48 w-full">
                      <Image
                        src={
                          files.scanned_national_id_or_passport_document
                            .preview || ''
                        }
                        alt="Uploaded document preview"
                        layout="fill"
                        objectFit="contain"
                        className="rounded-md"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 p-2">
                      <FileText className="h-6 w-6 text-primary" />
                      <span className="text-sm font-medium">
                        {files.scanned_national_id_or_passport_document.name}
                      </span>
                    </div>
                  )}
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-0 right-0"
                    onClick={() =>
                      removeFile('scanned_national_id_or_passport_document')
                    }
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-4 border-2 border-dashed rounded-lg">
                  <Upload className="h-8 w-8 mb-2 text-primary" />
                  <p className="mb-2 text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
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
  );
};

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
