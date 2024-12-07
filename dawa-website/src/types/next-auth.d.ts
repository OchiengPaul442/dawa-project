import { DefaultSession, DefaultUser } from 'next-auth';
import { JWT as DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  /**
   * Extending the default Session interface to include custom fields.
   */
  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
      name: string;
      image: string;
      role: string;
    };
    accessToken: string;
  }

  /**
   * Extending the default User interface to include custom fields.
   */
  interface User extends DefaultUser {
    id: string;
    email: string;
    name: string;
    image: string;
    role: string;
    token: string;
  }
}

declare module 'next-auth/jwt' {
  /**
   * Extending the default JWT interface to include custom fields.
   */
  interface JWT extends DefaultJWT {
    id: string;
    email: string;
    name: string;
    picture: string;
    role: string;
    accessToken: string;
  }
}
