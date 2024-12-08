import { withAuth } from 'next-auth/middleware';
import { NextRequest, NextResponse } from 'next/server';

export default withAuth(
  function middleware(req: NextRequest) {
    // Additional checks can be performed here if needed.
    // For example, you could inspect the token or enforce role-based restrictions.
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const protectedRoutes = ['/messages', '/wishlist'];
        const isProtected = protectedRoutes.some((route) =>
          req.nextUrl.pathname.startsWith(route),
        );
        // If route is protected, ensure token is present (logged in)
        return isProtected ? !!token : true;
      },
    },
    pages: {
      signIn: '/login', // Redirect to this page if not authorized
    },
  },
);

export const config = {
  matcher: ['/messages/:path*', '/wishlist/:path*'],
};
