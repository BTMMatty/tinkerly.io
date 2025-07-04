// middleware.js - Place this in your ROOT directory (same level as package.json)
import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware({
  // Routes that anyone can access without authentication
  publicRoutes: [
    '/',              // Landing page
    '/sign-in',       // Sign in page
    '/sign-up',       // Sign up page  
    '/api/webhook',   // Any webhooks
    '/api/public(.*)', // Any public API routes
  ],
  
  // Routes that require authentication (will redirect to sign-in if not logged in)
  protectedRoutes: [
    '/dashboard',     // User dashboard
    '/projects',      // Project management
    '/profile',       // User profile
    '/api/projects',  // Protected API routes
    '/api/user(.*)',  // User-specific API routes
  ],

  // What happens after authentication check
  afterAuth(auth, req) {
    // User is not authenticated and trying to access a protected route
    if (!auth.userId && !auth.isPublicRoute) {
      return new Response(null, {
        status: 302,
        headers: {
          Location: '/sign-in'
        }
      })
    }

    // User is authenticated and trying to access sign-in/sign-up pages
    // Redirect them to dashboard instead
    if (auth.userId && (req.nextUrl.pathname === '/sign-in' || req.nextUrl.pathname === '/sign-up')) {
      return new Response(null, {
        status: 302,
        headers: {
          Location: '/dashboard'
        }
      })
    }

    // Allow the request to continue
    return null
  }
})

// Configure which routes this middleware should run on
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}