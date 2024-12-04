import { withAuth } from 'next-auth/middleware';
import { NextRequest, NextResponse } from 'next/server';

export default withAuth(
  function middleware(req: NextRequest) {
    // Custom logic can be added here if needed
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Define protected routes
        const protectedRoutes = ['/messages', '/wishlist'];

        // Check if the request path starts with any protected route
        const isProtected = protectedRoutes.some((route) =>
          req.nextUrl.pathname.startsWith(route),
        );

        if (isProtected) {
          return !!token; // Allow access if token exists (user is authenticated)
        }

        return true;
      },
    },

    // Redirect to this page if not authenticated
    pages: {
      signIn: '/login',
    },
  },
);

// Specify the paths where the middleware should run
export const config = {
  matcher: ['/messages/:path*', '/wishlist/:path*'],
};
