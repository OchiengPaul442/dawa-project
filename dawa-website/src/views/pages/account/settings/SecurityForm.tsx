import type React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface SecurityFormProps {
  passwordData: PasswordData;
  handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordUpdate: () => Promise<void>;
  isChangingPassword: boolean;
}

export const SecurityForm: React.FC<SecurityFormProps> = ({
  passwordData,
  handlePasswordChange,
  handlePasswordUpdate,
  isChangingPassword,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          className="space-y-6"
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
  );
};

interface FormFieldProps {
  label: string;
  id: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  id,
  type,
  value,
  onChange,
}) => (
  <div className="space-y-2">
    <Label htmlFor={id}>{label}</Label>
    <Input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      className="h-10"
    />
  </div>
);
