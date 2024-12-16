import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { db } from 'src/lib/db'

export async function PUT(req: Request, { params }: { params: Promise<{ categoryId: string }> }) {
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

export async function DELETE(req: Request, { params }: { params: Promise<{ categoryId: string }> }) {
  try {
    const paramsResult = await params
    const { userId } = await auth()
    if (!userId) return new NextResponse('Unauthorized', { status: 401 })

    const category = await db.category.findUnique({
      where: {
        id: paramsResult.categoryId,
      },
      include: {
        courses: true,
      },
    })

    if (!category) return new NextResponse('Not Found', { status: 404 })

    if (category.courses.length > 0) {
      return new NextResponse('Existe curso vinculado a essa categoria. Favor excluir o curso primeiro ', {
        status: 500,
      })
    }

    const deleteCategory = await db.category.delete({
      where: {
        id: paramsResult.categoryId,
      },
    })

    return NextResponse.json(deleteCategory)
  } catch (error) {
    console.log('[COURSE-DELETE]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
