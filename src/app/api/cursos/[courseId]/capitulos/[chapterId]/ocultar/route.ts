import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { db } from 'src/lib/db'

export async function PATCH(req: Request, { params }: { params: Promise<{ courseId: string; chapterId: string }> }) {
  try {
    const paramsResult = await params
    const { userId } = await auth()
    if (!userId) return new NextResponse('Unauthorized', { status: 401 })
    const courseOwner = await db.course.findUnique({
      where: {
        id: paramsResult.courseId,
        userId: userId,
      },
    })
    if (!courseOwner) return new NextResponse('Unauthorized', { status: 401 })

    const publishedChaptersInCourse = await db.chapter.update({
      where: {
        id: paramsResult.chapterId,
        courseId: paramsResult.courseId,
      },
      data: {
        isPublished: false,
      },
    })

    const publishedChaptersInCourses = await db.chapter.findMany({
      where: {
        courseId: paramsResult.courseId,
        isPublished: true,
      },
    })

    if (!publishedChaptersInCourses.length) {
      await db.course.update({
        where: {
          id: paramsResult.courseId,
        },
        data: {
          isPublished: false,
        },
      })
    }

    return NextResponse.json(publishedChaptersInCourse)
  } catch (error) {
    console.log('[CHAPTER-PUBLISH]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
