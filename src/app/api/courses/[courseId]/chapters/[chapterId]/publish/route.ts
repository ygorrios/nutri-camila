import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { db } from 'src/lib/db'

export async function PATCH(req: Request, { params }: { params: { courseId: string; chapterId: string } }) {
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

    const chapter = await db.chapter.findUnique({
      where: {
        id: paramsResult.chapterId,
        courseId: paramsResult.courseId,
      },
    })

    const muxData = await db.muxData.findUnique({
      where: {
        chapterId: paramsResult.chapterId,
      },
    })

    if (!chapter || !muxData || !chapter.videoUrl || !chapter.description || !chapter.title)
      return new NextResponse('Missing required fields', { status: 400 })
    const publishedChaptersInCourse = await db.chapter.update({
      where: {
        id: paramsResult.chapterId,
        courseId: paramsResult.courseId,
      },
      data: {
        isPublished: true,
      },
    })
    return NextResponse.json(publishedChaptersInCourse)
  } catch (error) {
    console.log('[CHAPTER-PUBLISH]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
