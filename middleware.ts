import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    // Redirect to login if no token (except for public routes)
    if (!token && !isPublicRoute(pathname)) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Role-based access control (RBAC)
    if (token) {
      // User-specific routes
      if (token.role === "user") {
        // Redirect users trying to access admin/verifier routes
        // if (pathname.startsWith("/admin") || pathname.startsWith("/verifier")) {
        //   return NextResponse.redirect(new URL("/dashboard/loans", req.url));
        // }
        // Ensure user stays within dashboard routes
        // if (!pathname.startsWith("/dashboard")) {
        //   return NextResponse.redirect(new URL("/dashboard/loans", req.url));
        // }
      }

      // Verifier-specific routes
      if (token.role === "verifier") {
        // if (pathname.startsWith("/admin")) {
        //   return NextResponse.redirect(new URL("/verifier", req.url));
        // }
        // if (pathname.startsWith("/dashboard/apply-loan")) {
        //   return NextResponse.redirect(new URL("/verifier", req.url));
        // }
      }

      // Admin-specific routes
      if (token.role === "admin") {
        // if (pathname.startsWith("/dashboard")) {
        //   return NextResponse.redirect(new URL("/admin", req.url));
        // }
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Public routes (no auth needed)
        if (isPublicRoute(pathname)) {
          return true;
        }

        // All other routes require authentication
        return !!token;
      },
    },
  }
);

// Helper function to check public routes
function isPublicRoute(pathname: string): boolean {
  return (
    pathname.startsWith("/api/auth") ||
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/" ||
    pathname.startsWith("/api/public")
  );
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public/).*)"],
};
