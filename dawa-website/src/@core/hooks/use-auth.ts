import { useState, useEffect, useCallback } from 'react';
import { useSession, signOut } from 'next-auth/react';
import axios from 'axios';
import * as jwtDecode from 'jwt-decode';
import { useSWRConfig } from 'swr';

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

// Represents the decoded JWT payload. We assume the token includes an 'exp' field (expiration time in seconds).
interface DecodedToken {
  exp: number;
  [key: string]: any;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export function useAuth() {
  const { data: session, status } = useSession();
  const { cache } = useSWRConfig(); // Access the SWR cache
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [counters, setCounters] = useState<Counters>({
    favorites: 0,
    messages: 0,
    notifications: 0,
  });
  const [tokenExpired, setTokenExpired] = useState(false);

  // Function to clear the SWR cache by iterating over its keys.
  const clearSWRCache = () => {
    // Check if cache has a keys method (like a Map)
    if (typeof cache.keys === 'function') {
      for (const key of cache.keys()) {
        cache.delete(key);
      }
    } else {
      console.warn('SWR cache does not support keys() method.');
    }
  };

  // Memoized logout function so it's stable across renders.
  const logout = useCallback(async () => {
    try {
      // Sign out the user (without redirecting immediately)
      await signOut({ redirect: false });
      // Clear local user state
      setUser(null);
      setCounters({
        favorites: 0,
        messages: 0,
        notifications: 0,
      });
      // Clear localStorage (or remove specific keys if desired)
      localStorage.clear();
      // Clear SWR cache manually
      clearSWRCache();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }, [cache]);

  // Axios interceptor to attach the token on each request.
  useEffect(() => {
    const interceptor = api.interceptors.request.use((config) => {
      if (session?.accessToken) {
        config.headers['Authorization'] = `Token ${session.accessToken}`;
      }
      return config;
    });
    return () => {
      api.interceptors.request.eject(interceptor);
    };
  }, [session]);

  // Decode the token to check its expiration and schedule a logout.
  useEffect(() => {
    if (session?.accessToken) {
      // Check if the token appears to be a valid JWT (should have three parts).
      if (session.accessToken.split('.').length !== 3) {
        console.warn('Invalid JWT token format. Skipping token decode.');
        return;
      }

      try {
        // Cast the imported module to a function type.
        const decodeJwt = jwtDecode as unknown as <T>(token: string) => T;
        const decoded = decodeJwt<DecodedToken>(session.accessToken);
        // JWT 'exp' is in seconds; convert it to milliseconds.
        const tokenExpirationTime = decoded.exp * 1000;
        const now = Date.now();

        if (tokenExpirationTime <= now) {
          // Token is already expired, so mark it and logout.
          setTokenExpired(true);
          logout();
        } else {
          // Schedule a logout when the token expires.
          const timeout = tokenExpirationTime - now;
          const timer = setTimeout(() => {
            setTokenExpired(true);
            logout();
          }, timeout);

          // Clean up the timer when the effect re-runs or the component unmounts.
          return () => clearTimeout(timer);
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, [session, logout]);

  // Fetch and set user data when session is available.
  useEffect(() => {
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
  }, [session, status]);

  return {
    user,
    loading: status === 'loading' || loading,
    logout,
    counters,
    tokenExpired,
  };
}
