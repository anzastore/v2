import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // STRICT check for 'user_role' cookie (Proxy for Auth in Token Mode)
    // Since we use Token Auth, we don't have 'is_auth' from server.
    // We rely on 'user_role' set by AuthProvider upon login.
    const userRole = request.cookies.get('user_role')?.value;
    const isAuth = !!userRole; // If role exists, we assume logged in for Middleware purposes

    // 1. GUEST trying to access PROTECTED routes
    if (!isAuth) {
        if (pathname.startsWith('/admin') || pathname.startsWith('/user')) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    // 2. LOGGED IN user trying to access AUTH routes
    if (isAuth) {
        if (pathname === '/login' || pathname === '/register') {
            if (userRole === 'admin') {
                return NextResponse.redirect(new URL('/admin/dashboard', request.url));
            } else {
                return NextResponse.redirect(new URL('/', request.url));
            }
        }
    }

    // 3. ROLE-BASED PROTECTION
    if (isAuth && userRole) {
        // Prevent User from accessing Admin routes
        if (pathname.startsWith('/admin') && userRole !== 'admin') {
            return NextResponse.redirect(new URL('/', request.url));
        }

        // Prevent Admin from accessing User routes (Optional, but good for separation)
        if (pathname.startsWith('/user') && userRole === 'admin') {
            return NextResponse.redirect(new URL('/admin/dashboard', request.url));
        }
    }

    // 4. LANDING REDIRECTS (Fixing the old /user and /admin pages)
    if (pathname === '/user') {
        return NextResponse.redirect(new URL('/', request.url));
    }
    if (pathname === '/admin') {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/admin/:path*',
        '/user/:path*',
        '/login',
        '/register',
    ],
};
