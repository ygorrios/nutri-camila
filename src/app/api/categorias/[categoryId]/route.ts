import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { db } from 'src/lib/db'

export async function PUT(req: Request, { params }: { params: { categoryId: string } }) {
  try {
    const paramsResult = await params
    const { userId } = await auth()
    const { name } = await req.json()

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const category = await db.category.upsert({
      where: {
        id: paramsResult.categoryId,
      },
      update: {
        name,
      },
      create: {
        id: paramsResult.categoryId,
        name,
      },
    })

    return NextResponse.json(category)
  } catch (error) {
    console.log('[CHAPTER_ID_PROGRESS]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
