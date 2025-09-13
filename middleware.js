import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(req) {
    // Add any additional middleware logic here
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        if (!token) return false;

        // Check if user has admin or system admin permissions
        const isAdmin = token.isAdmin || token.isSystemAdmin;
        if (!isAdmin) return false;

        // If trying to access users page, check for system admin
        if (req.nextUrl.pathname.startsWith('/dashboard/users')) {
          return token.isSystemAdmin === true;
        }

        return true;
      },
    },
  }
);

export const config = {
  matcher: ['/dashboard/:path*'],
};
