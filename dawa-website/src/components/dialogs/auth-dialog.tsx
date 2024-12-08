'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import GoogleIcon from '@public/assets/svgs/google.svg';
import { useDispatch, useSelector } from '@/lib/hooks';
import { closeAuthDialog } from '@/lib/features/authDialog/authDialogSlice';
import type { RootState } from '@/lib/store';
import { signIn } from 'next-auth/react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { authSchema } from '@/validations/authValidation';
import { useState } from 'react';

interface AuthFormInputs {
  emailOrUsername: string;
  password: string;
  rememberMe: boolean;
}

export function AuthDialog() {
  const dispatch = useDispatch();
  const router = useRouter();
  const isOpen = useSelector(
    (state: RootState) => state.authDialog.isOpen,
  ) as boolean;

  const [authError, setAuthError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormInputs>({
    resolver: yupResolver(authSchema),
  });

  const onSubmit: SubmitHandler<AuthFormInputs> = async (data) => {
    setIsSubmitting(true);
    setAuthError(null);

    // Attempt to sign in with credentials
    const result = await signIn('credentials', {
      redirect: false,
      username: data.emailOrUsername,
      password: data.password,
    });

    if (result?.error) {
      setAuthError(result.error);
    } else {
      dispatch(closeAuthDialog());
    }

    setIsSubmitting(false);
  };

  const handleGoogleSignIn = async () => {
    setIsSubmitting(true);
    setAuthError(null);

    // Initiate Google sign-in via NextAuth
    const result = await signIn('google', { redirect: false });

    if (result?.error) {
      setAuthError(result.error);
    } else if (result?.ok) {
      dispatch(closeAuthDialog());
    }

    setIsSubmitting(false);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      dispatch(closeAuthDialog());
    }
  };

  const handleLinkClick = (path: string) => {
    dispatch(closeAuthDialog());
    router.push(path);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center font-bold">
            Welcome Back
          </DialogTitle>
          <DialogDescription className="text-center">
            Sign in to your account to continue
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          {/* Google Sign-In Button */}
          <Button
            variant="outline"
            className="w-full h-12 relative"
            onClick={handleGoogleSignIn}
            disabled={isSubmitting}
          >
            <GoogleIcon className="mr-2 h-5 w-5 text-primary_1" />
            <span>Continue with Google</span>
          </Button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          {/* Username or Email Input */}
          <div className="space-y-2">
            <Label htmlFor="emailOrUsername">Username or Email</Label>
            <Controller
              name="emailOrUsername"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input
                  {...field}
                  id="emailOrUsername"
                  type="text"
                  placeholder="Username or Email"
                  aria-invalid={errors.emailOrUsername ? 'true' : 'false'}
                  className={errors.emailOrUsername ? 'border-red-500' : ''}
                />
              )}
            />
            {errors.emailOrUsername && (
              <p className="text-red-500 text-sm mt-1">
                {errors.emailOrUsername.message}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input
                  {...field}
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  aria-invalid={errors.password ? 'true' : 'false'}
                  className={errors.password ? 'border-red-500' : ''}
                />
              )}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Authentication Error */}
          {authError && (
            <div className="text-red-500 text-sm text-center">{authError}</div>
          )}

          {/* Sign In Button */}
          <Button
            type="submit"
            className="w-full bg-primary_1 hover:bg-primary_1/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </Button>

          {/* Register Link */}
          <div className="text-sm text-center">
            Don&apos;t have an account?{' '}
            <Button
              variant="link"
              className="p-0 h-auto font-normal text-primary_1"
              onClick={() => handleLinkClick('/register')}
            >
              Register here
            </Button>
          </div>

          {/* Terms and Privacy */}
          <div className="text-xs text-center text-muted-foreground">
            By continuing, you agree to our{' '}
            <Button
              variant="link"
              className="p-0 h-auto text-xs font-normal text-primary_1"
              onClick={() => handleLinkClick('/legal/terms')}
            >
              Terms of Service
            </Button>{' '}
            and{' '}
            <Button
              variant="link"
              className="p-0 h-auto text-xs font-normal text-primary_1"
              onClick={() => handleLinkClick('/legal/privacy')}
            >
              Privacy Policy
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
