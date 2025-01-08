import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

interface ApiUserData {
  id: number;
  email: string;
  first_name?: string;
  last_name?: string;
  user_profile_picture?: string;
  user_role?: string;
}

interface LoginResponse {
  status: number;
  message?: string;
  user_data?: {
    token?: string;
    user_data?: ApiUserData;
  };
}

// Extend NextAuth's default types to include custom fields
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image: string | null;
      role: string | null;
    };
    accessToken: string | null;
  }

  interface User {
    id: string;
    name: string;
    email: string;
    image: string | null;
    role: string | null;
    token: string | null;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    name: string;
    email: string;
    picture: string | null;
    role: string | null;
    accessToken: string | null;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope: 'openid email profile',
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username or Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Ensure credentials were provided
        if (!credentials?.username || !credentials?.password) {
          throw new Error('Username or password missing');
        }

        try {
          // Attempt login
          const response = await axios.post<LoginResponse>(
            `${process.env.NEXT_PUBLIC_API_URL}/login/`,
            {
              username: credentials.username,
              password: credentials.password,
            },
            {
              validateStatus: (status) => status === 200 || status === 202,
            },
          );

          const { status, user_data, message } = response.data;

          // Validate response
          if (status !== 202 || !user_data?.user_data) {
            console.error('Invalid login response:', response.data);
            throw new Error(message || 'Invalid login response');
          }

          const userInfo = user_data.user_data;

          // Validate user info
          if (!userInfo.id || !userInfo.email) {
            console.error(
              'Incomplete user data returned from login API:',
              userInfo,
            );
            throw new Error('Incomplete user data returned from login API');
          }

          // Return the user object that NextAuth will store in the JWT
          return {
            id: userInfo.id.toString(),
            name: `${userInfo.first_name || ''} ${userInfo.last_name || ''}`.trim(),
            email: userInfo.email,
            image: userInfo.user_profile_picture ?? null,
            role: userInfo.user_role ?? null,
            token: user_data.token ?? null,
          };
        } catch (error) {
          console.error('Login error:', error);
          throw error; // Rethrow to stop flow
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (!account || !user) {
        return token;
      }

      if (account.provider === 'google') {
        try {
          const response = await axios.post<LoginResponse>(
            `${process.env.NEXT_PUBLIC_API_URL}/googlelogin/`,
            {
              google_token: account.id_token,
              user_role: 'Client',
            },
          );

          const { user_data } = response.data;
          const userInfo = user_data?.user_data;

          if (!userInfo || !userInfo.id) {
            throw new Error(
              'Invalid Google login response or user info missing',
            );
          }

          token.id = userInfo.id.toString();
          token.name =
            `${userInfo.first_name || ''} ${userInfo.last_name || ''}`.trim();
          token.email = userInfo.email;
          token.picture = userInfo.user_profile_picture ?? null;
          token.role = userInfo.user_role ?? null;
          token.accessToken = user_data?.token ?? null;
        } catch (error) {
          console.error('Error during Google login:', error);
          throw error; // Abort the flow
        }
      } else if (account.provider === 'credentials') {
        // Credentials provider logic
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image ?? null;
        token.role = user.role ?? null;
        token.accessToken = user.token ?? null;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.role = token.role;
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
