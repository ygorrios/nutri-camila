import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { db } from 'src/lib/db'
import { isTeacherServer } from 'src/lib/teacher'

export async function POST(req: Request) {
  try {
    debugger
    const { userId } = await auth()
    const { title } = await req.json()
    const isTeacher = await isTeacherServer(userId)
    if (!userId || !isTeacher) {
      return new NextResponse('Unauthorized', { status: 401 })
    }
    const course = await db.course.create({
      data: {
        userId,
        title,
      },
    })
    return NextResponse.json(course)
  } catch (error) {
    console.log('[COURSES]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
