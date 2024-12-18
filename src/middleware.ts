import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { isTeacherServer } from './lib/teacher'

const isPublicRoutes = createRouteMatcher(['/api/uploadthing(.*)'])
const isAuthRoutes = createRouteMatcher(['/sign-in', '/sign-up'])

export default clerkMiddleware(async (auth, request) => {
  const { userId } = await auth()
  // console.log('userId', userId)
  const isTeacher = await isTeacherServer(userId)
  const isTeacherPage = request.nextUrl?.pathname?.startsWith('/app/professor')
  // console.log('isTeacher', isTeacher)
  // console.log('isTeacherPage', isTeacherPage)
  const response = NextResponse.next()
  const isPublic = isPublicRoutes(request)
  const isAuth = isAuthRoutes(request)
  const isHomePage = request.nextUrl.pathname === '/'

  if (!isTeacher && isTeacherPage) {
    return NextResponse.redirect(new URL('/app', request.nextUrl))
  } else if (!isAuth && !userId && !isHomePage) {
    await auth.protect()
  } else if ((isAuth && userId) || (isHomePage && userId)) {
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
