import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { db } from 'src/lib/db'

export async function DELETE(req: Request, { params }: { params: { courseId: string; attachmentId: string } }) {
  try {
    const paramsResult = await params
    const { userId } = await auth()
    if (!userId) return new NextResponse('Unauthorized', { status: 401 })
    const courseOwner = await db.course.findUnique({
      where: {
        id: paramsResult.courseId,
        userId,
      },
    })
    if (!courseOwner) return new NextResponse('Unauthorized', { status: 401 })
    const attachment = await db.attachment.delete({
      where: {
        id: paramsResult.attachmentId,
        courseId: paramsResult.courseId,
      },
    })
    return NextResponse.json(attachment)
  } catch (error) {
    console.log('[ATTACHMENTS_ID]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
