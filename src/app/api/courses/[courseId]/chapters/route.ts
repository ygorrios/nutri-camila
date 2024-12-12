import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { db } from 'src/lib/db'

export async function POST(req: Request, { params }: { params: { courseId: string } }) {
  try {
    const paramsResult = await params
    const { userId } = await auth()
    const { title } = await req.json()
    if (!userId) return new NextResponse('Unauthorized', { status: 401 })
    const courseOwner = await db.course.findUnique({
      where: {
        id: paramsResult.courseId,
        userId: userId,
      },
    })
    if (!courseOwner) return new NextResponse('Unauthorized', { status: 401 })

    const lastChapter = await db.chapter.findFirst({
      where: {
        courseId: paramsResult.courseId,
      },
      orderBy: {
        position: 'desc',
      },
    })

    const newPosition = lastChapter ? lastChapter.position + 1 : 1

    const chapter = await db.chapter.create({
      data: {
        title,
        position: newPosition,
        courseId: paramsResult.courseId,
      },
    })

    return NextResponse.json(chapter)
  } catch (error) {
    console.log('[CHAPTERS]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
