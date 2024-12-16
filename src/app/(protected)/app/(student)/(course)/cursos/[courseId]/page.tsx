import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { db } from 'src/lib/db'

const CourseIdPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ courseId: string }>
  searchParams: Promise<{ success: string }>
}) => {
  const paramsResult = await params
  const searchParamsResult = await searchParams
  const { userId } = await auth()
  const course = await db.course.findUnique({
    where: {
      id: paramsResult.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        orderBy: {
          position: 'asc',
        },
      },
    },
  })

  if (!course) {
    return redirect('/')
  }

  if (searchParamsResult.success === '1' && userId) {
    const purchase = await db.purchase.create({
      data: {
        userId: userId,
        courseId: paramsResult?.courseId,
      },
    })
  }

  return redirect(`/app/cursos/${course.id}/capitulos/${course.chapters[0].id}`)
}

export default CourseIdPage
