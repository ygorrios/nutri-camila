import { NextResponse } from 'next/server'

import { auth } from '@clerk/nextjs/server'
import { db } from 'src/lib/db'

export async function PUT(req: Request, { params }: { params: Promise<{ courseId: string; chapterId: string }> }) {
  try {
    const paramsResult = await params
    const { userId } = await auth()
    const { isCompleted } = await req.json()

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const userProgress = await db.userProgress.upsert({
      where: {
        userId_chapterId: {
          userId,
          chapterId: paramsResult.chapterId,
        },
      },
      update: {
        isCompleted,
      },
      create: {
        userId,
        chapterId: paramsResult.chapterId,
        isCompleted,
      },
    })
    // revalidatePath(
    //   `/app/cursos/${paramsResult.courseId}/capitulos/${paramsResult.chapterId}`
    // )

    return NextResponse.json(userProgress)
  } catch (error) {
    console.log('[CHAPTER_ID_PROGRESS]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
