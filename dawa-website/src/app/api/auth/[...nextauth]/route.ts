import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';

const handler = NextAuth(authOptions);

// Export only the route handlers
export { handler as GET, handler as POST };
