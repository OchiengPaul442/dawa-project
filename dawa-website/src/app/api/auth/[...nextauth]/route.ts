// pages/api/auth/[...nextauth].ts
import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

export const authOptions: NextAuthOptions = {
  providers: [
    // Google OAuth Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          // Request the access token
          scope: 'openid email profile',
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    }),
    // Credentials Provider for custom username/password authentication
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username or Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Ensure both username and password are provided
        if (!credentials?.username || !credentials?.password) {
          console.error('Missing username or password in credentials.');
          return null;
        }

        try {
          // Send login request to your custom API endpoint
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/login/`,
            {
              username: credentials.username,
              password: credentials.password,
            },
            {
              validateStatus: (status) => {
                // Only accept 200 and 202 as valid responses
                return status === 200 || status === 202;
              },
            },
          );

          const { user_data, message, status } = response.data;

          // Validate the response structure and status
          if (status !== 202 || !user_data || !user_data.user_data) {
            console.error('Invalid login response:', response.data);
            return null;
          }

          const user = user_data.user_data;

          // Ensure critical user fields are present
          if (!user.id || !user.email) {
            console.error(
              'Incomplete user data returned from login API:',
              user,
            );
            return null;
          }

          // Return user object with custom fields
          return {
            id: user.id.toString(),
            name: `${user.first_name || ''} ${user.last_name || ''}`.trim(),
            email: user.email,
            image: user.user_profile_picture,
            role: user.user_role,
            token: user_data.token,
          };
        } catch (error) {
          console.error('Login error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    /**
     * JWT Callback
     * This is called whenever a JSON Web Token is created or updated.
     */
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        token.accessToken = account.access_token || '';

        if (account.provider === 'google') {
          try {
            // Send the Google access token and user_role to your custom API
            const response = await axios.post(
              `${process.env.NEXT_PUBLIC_API_URL}/api/googlelogin/`,
              {
                google_token: account.access_token,
                user_role: 'Client', // Change as needed or make dynamic
              },
            );

            const { user_data } = response.data;
            const userInfo = user_data.user_data;

            // Populate the token with user data from your API
            token.id = userInfo.id.toString();
            token.name = `${userInfo.first_name} ${userInfo.last_name}`.trim();
            token.email = userInfo.email;
            token.picture = userInfo.user_profile_picture;
            token.role = userInfo.user_role;
            token.accessToken = user_data.token;
          } catch (error) {
            console.error('Error during Google login:', error);
            // Optionally, handle errors (e.g., set a flag in the token)
          }
        }
      }

      return token;
    },

    /**
     * Session Callback
     * This is called whenever a session is checked.
     * It ensures that the session object includes the necessary custom fields.
     */
    async session({ session, token }) {
      // Attach custom fields to the session
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
    signIn: '/login', // Custom sign-in page
  },
  session: {
    strategy: 'jwt', // Use JWT for session management
  },
  secret: process.env.NEXTAUTH_SECRET, // Ensure this is set in your environment variables
};

// Initialize NextAuth with the defined options
const handler = NextAuth(authOptions);

// Export the handler for both GET and POST requests
export { handler as GET, handler as POST };
