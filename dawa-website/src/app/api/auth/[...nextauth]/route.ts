import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    // Google OAuth Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    // Credentials Provider for Email/Username and Password
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        emailOrUsername: {
          label: 'Email or Username',
          type: 'text',
          placeholder: 'you@example.com or username',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const { emailOrUsername, password } = credentials;

        // Call your custom login API
        const res = await fetch('https://your-api.com/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            emailOrUsername,
            password,
          }),
        });

        // Check if response is JSON
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Invalid response from server');
        }

        const user = await res.json();

        // If authentication is successful, return user object
        if (res.ok && user) {
          return user;
        }

        // Return null if authentication fails
        return null;
      },
    }),
  ],

  // Define custom pages
  pages: {
    signIn: '/login',
  },

  // Use JSON Web Tokens for session management
  session: {
    strategy: 'jwt',
  },

  // Secure the tokens with a secret
  secret: process.env.NEXTAUTH_SECRET,

  // Callbacks to handle token and session
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        // Add more user properties if needed
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        // Add more session properties if needed
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
