import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { isTeacherServer } from './lib/teacher'

const isProtectedRoute = createRouteMatcher(['/app(.*)', '/sign-in', '/sign-up', '/api/uploadthing(.*)'])

export default clerkMiddleware(async (auth, request) => {
  const { userId } = await auth()
  console.log('userId', userId)
  const isTeacher = await isTeacherServer(userId)
  const isTeacherPage = request.nextUrl?.pathname?.startsWith('/app/teacher')
  console.log('isTeacher', isTeacher)
  console.log('isTeacherPage', isTeacherPage)
  const response = NextResponse.next()
  const isProtected = isProtectedRoute(request)
  const isHomePage = request.nextUrl.pathname === '/'

  if (!isTeacher && isTeacherPage) {
    return NextResponse.redirect(new URL('/app', request.nextUrl))
  }
  if (isProtected && !userId && !isHomePage) {
    await auth.protect()
  } else if (!isProtected && userId) {
    return NextResponse.redirect(new URL('/app', request.nextUrl))
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
