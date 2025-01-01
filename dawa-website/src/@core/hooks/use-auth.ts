import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import axios from 'axios';

interface User {
  id: string;
  name: string;
  email: string;
  image: string;
}

interface Counters {
  favorites: number;
  messages: number;
  notifications: number;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export function useAuth() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [counters, setCounters] = useState<Counters>({
    favorites: 0,
    messages: 0,
    notifications: 0,
  });

  useEffect(() => {
    const source = axios.CancelToken.source();

    // Add interceptor to attach token on each request, if present
    api.interceptors.request.use((config) => {
      if (session?.accessToken) {
        config.headers['Authorization'] = `Token ${session.accessToken}`;
      }
      return config;
    });

    const fetchUserData = async () => {
      if (session?.user) {
        setUser({
          id: session.user.id as string,
          name: session.user.name || '',
          email: session.user.email || '',
          image: session.user.image || '',
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    if (status !== 'loading') {
      fetchUserData();
    }

    return () => {
      source.cancel('useAuth hook unmounted');
    };
  }, [session, status]);

  const logout = async () => {
    try {
      await signOut({ redirect: false });
      setUser(null);
      setCounters({
        favorites: 0,
        messages: 0,
        notifications: 0,
      });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return { user, loading: status === 'loading' || loading, logout, counters };
}
