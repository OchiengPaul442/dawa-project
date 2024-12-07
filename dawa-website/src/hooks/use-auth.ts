import { useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  image: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const counters = {
    favorites: 12,
    messages: 1200,
    notifications: 5,
  };

  useEffect(() => {
    // Mock API call to check authentication
    const checkAuth = async () => {
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock authenticated user - in real app, this would be an API call
        // setUser({
        //   id: '1',
        //   name: 'John Doe',
        //   email: 'john@example.com',
        //   image: '/placeholder.svg?height=32&width=32',
        // });
        setUser(null);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const logout = async () => {
    // Mock logout
    setUser(null);
  };

  return { user, loading, logout, counters };
}
