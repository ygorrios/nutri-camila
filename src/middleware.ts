import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isProtectedRoute = createRouteMatcher(['/app(.*)'])

export default clerkMiddleware(async (auth, request) => {
  const { userId } = await auth()
  const response = NextResponse.next()
  const isProtected = isProtectedRoute(request)
  const isHomePage = request.nextUrl.pathname === '/'

  if (isProtected && !userId && !isHomePage) {
    await auth.protect()
  } else if (!isProtected && userId) {
    return NextResponse.redirect(new URL('/app/', request.nextUrl))
  }
  return response
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
