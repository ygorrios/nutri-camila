import { redirect } from 'next/navigation'

import { getProgress } from 'src/actions/get-progress'
import { db } from 'src/lib/db'

import { auth } from '@clerk/nextjs/server'
import { CourseNavbar } from './_components/course-navbar'
import { CourseSidebar } from './_components/course-sidebar'

const CourseLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ courseId: string }>
}) => {
  const paramsResult = await params
  const { userId } = await auth()

  if (!userId) {
    return redirect('/')
  }

  const course = await db.course.findUnique({
    where: {
      id: paramsResult.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        include: {
          userProgress: {
            where: {
              userId,
            },
          },
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

  const progressCount = await getProgress(userId, course.id)

  return (
    <div className='h-full'>
      <div className='h-[80px] md:pl-80 fixed inset-y-0 w-full z-50'>
        <CourseNavbar course={course} progressCount={progressCount} />
      </div>
      <div className='hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50'>
        <CourseSidebar course={course} progressCount={progressCount} />
      </div>
      <main className='md:pl-80 pt-[80px] h-full'>{children}</main>
    </div>
  )
}

export default CourseLayout
