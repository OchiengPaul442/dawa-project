import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      // Add more user properties if needed
    };
  }

  interface User {
    id: string;
    email: string;
    // Add more user properties if needed
  }
}
