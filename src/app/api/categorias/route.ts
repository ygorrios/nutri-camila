import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { db } from 'src/lib/db'
import { isTeacherServer } from 'src/lib/teacher'

export async function POST(req: Request) {
  try {
    const { userId } = await auth()
    const { name } = await req.json()
    const isTeacher = await isTeacherServer(userId)
    if (!userId || !isTeacher) {
      return new NextResponse('Unauthorized', { status: 401 })
    }
    const category = await db.category.create({
      data: {
        name,
      },
    })
    return NextResponse.json(category)
  } catch (error) {
    console.log('[COURSES]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
