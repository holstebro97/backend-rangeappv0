import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Add this config to specify which routes to handle
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

export function middleware(request: NextRequest) {
  // For now, let's disable the middleware to test the client-side redirects
  return NextResponse.next()
} 