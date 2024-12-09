// middleware.ts

import { withAuth, type NextRequestWithAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

// Define routes that require authentication
const PROTECTED_ROUTES = [
  '/messages',
  '/wishlist',
  '/account',
  '/notifications',
];

// Define role-based protected routes
const ROLE_PROTECTED_ROUTES: Record<string, string[]> = {
  '/vendor': ['Vendor'],
  '/client': ['Client'],
};

/**
 * Middleware to handle authentication and authorization.
 * Redirects users based on authentication status and role.
 *
 * @param {NextRequestWithAuth} req - The incoming request with auth information.
 * @returns {NextResponse} - The response object, potentially a redirect.
 */
function middleware(req: NextRequestWithAuth) {
  const { pathname, origin } = req.nextUrl;
  const token = req.nextauth.token;
  const isAuthenticated = Boolean(token);
  const isAuthPage = pathname.startsWith('/login');

  // Redirect authenticated users away from the login page
  if (isAuthPage && isAuthenticated) {
    return NextResponse.redirect(new URL('/', origin));
  }

  // Redirect unauthenticated users trying to access protected routes to login
  if (
    !isAuthenticated &&
    PROTECTED_ROUTES.some((route) => pathname.startsWith(route))
  ) {
    return NextResponse.redirect(
      new URL(`/login?from=${encodeURIComponent(pathname)}`, origin),
    );
  }

  // Role-based access control
  for (const route in ROLE_PROTECTED_ROUTES) {
    if (pathname.startsWith(route)) {
      const userRole = token?.role;
      const allowedRoles = ROLE_PROTECTED_ROUTES[route];
      if (!userRole || !allowedRoles.includes(userRole)) {
        return NextResponse.redirect(new URL('/no-access', origin));
      }
    }
  }

  return NextResponse.next();
}

/**
 * Export the middleware wrapped with NextAuth's authentication handling.
 */
export default withAuth(middleware, {
  callbacks: {
    authorized: () => true,
  },
  pages: {
    signIn: '/login',
  },
});

/**
 * Specify the routes the middleware should apply to.
 */
export const config = {
  matcher: [
    '/login',
    '/messages/:path*',
    '/wishlist/:path*',
    '/account/:path*',
    '/notifications/:path*',
    '/vendor/:path*',
    '/client/:path*',
  ],
};
