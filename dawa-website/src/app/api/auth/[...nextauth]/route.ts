import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

// Define authOptions locally without exporting
const authOptions: AuthOptions = {
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
        if (!credentials?.username || !credentials?.password) {
          console.error('Missing username or password in credentials.');
          return null;
        }

        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/login/`,
            {
              username: credentials.username,
              password: credentials.password,
            },
            {
              validateStatus: (status) => status === 200 || status === 202,
            },
          );

          const { user_data, status } = response.data;

          if (status !== 202 || !user_data || !user_data.user_data) {
            console.error('Invalid login response:', response.data);
            return null;
          }

          const user = user_data.user_data;

          if (!user.id || !user.email) {
            console.error(
              'Incomplete user data returned from login API:',
              user,
            );
            return null;
          }

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
    async jwt({ token, user, account }) {
      if (account && user) {
        token.accessToken = account.access_token || '';

        if (account.provider === 'google') {
          try {
            const response = await axios.post(
              `${process.env.NEXT_PUBLIC_API_URL}/api/googlelogin/`,
              {
                google_token: account.id_token,
                user_role: 'Client',
              },
            );

            const { user_data } = response.data;
            const userInfo = user_data?.user_data;

            token.id = userInfo.id.toString();
            token.name = `${userInfo.first_name} ${userInfo.last_name}`.trim();
            token.email = userInfo.email;
            token.picture = userInfo.user_profile_picture;
            token.role = userInfo.user_role;
            token.accessToken = user_data.token;
          } catch (error) {
            console.error('Error during Google login:', error);
          }
        }
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

const handler = NextAuth(authOptions);

// Export only the route handlers
export { handler as GET, handler as POST };
