import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { db } from 'src/lib/db'

export async function POST(req: Request, { params }: { params: { courseId: string } }) {
  try {
    const paramsResult = await params
    const { userId } = await auth()
    const { url } = await req.json()
    if (!userId) return new NextResponse('Unauthorized', { status: 401 })
    const courseOwner = await db.course.findUnique({
      where: {
        id: paramsResult.courseId,
        userId,
      },
    })
    if (!courseOwner) return new NextResponse('Unauthorized', { status: 401 })
    const attachment = await db.attachment.create({
      data: {
        url,
        name: url.split('/').pop(),
        courseId: paramsResult.courseId,
      },
    })
    return NextResponse.json(attachment)
  } catch (error) {
    console.log('[COURSE_ID_ATTACHMENTS]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
