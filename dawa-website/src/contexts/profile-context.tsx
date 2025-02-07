'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { useUserProfile } from '@core/hooks/useProductData';

interface UserProfile {
  id: number;
  user: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    is_active: boolean;
    date_joined: string;
    last_login: string;
  };
  contact: string | null;
  address: string | null;
  user_profile_picture: string | null;
  user_national_id_or_passport: string | null;
  scanned_national_id_or_passport: string | null;
}

interface ProfileContextType {
  userProfile: UserProfile | null;
  items: any;
  isLoading: boolean;
  isError: any;
  mutate: () => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const { userProfile, items, isLoading, isError, mutate } = useUserProfile();

  return (
    <ProfileContext.Provider
      value={{ userProfile, items, isLoading, isError, mutate }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}
