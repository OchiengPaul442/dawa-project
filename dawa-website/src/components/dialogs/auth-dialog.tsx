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
import Link from 'next/link';
import GoogleIcon from '@public/assets/svgs/google.svg';
import { useDispatch, useSelector } from '@/lib/hooks';
import { closeAuthDialog } from '@/lib/features/authDialog/authDialogSlice';
import type { RootState } from '@/lib/store';

export function AuthDialog() {
  const dispatch = useDispatch();
  const isOpen = useSelector(
    (state: RootState) => state.authDialog.isOpen,
  ) as boolean;

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      dispatch(closeAuthDialog());
    }
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
        <div className="space-y-4 py-4">
          <Button
            variant="outline"
            className="w-full h-12 relative"
            onClick={() => console.log('Google sign in')}
          >
            <GoogleIcon className="mr-2 h-5 w-5 text-primary_1" />
            <span>Continue with Google</span>
          </Button>
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
          <div className="space-y-2">
            <Label htmlFor="email">Email or Phone</Label>
            <Input id="email" type="email" placeholder="m@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
          <Button className="w-full bg-primary_1 hover:bg-primary_1/90">
            Sign In
          </Button>
          <div className="text-sm text-center">
            Don't have an account?{' '}
            <Link href="/register" className="text-primary_1 hover:underline">
              Register here
            </Link>
          </div>
          <div className="text-xs text-center text-muted-foreground">
            By continuing, you agree to our{' '}
            <Link href="/terms" className="text-primary_1 hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-primary_1 hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}