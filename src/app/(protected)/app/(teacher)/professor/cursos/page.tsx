import { auth } from '@clerk/nextjs/server'
import { NextPage } from 'next'
import { redirect } from 'next/navigation'
import PlaceholderContent from 'src/components/default-page'
import { db } from 'src/lib/db'
import { CourseGrid } from './_components/course-grid'

interface Props {}

const CoursesPage: NextPage<Props> = async ({}) => {
  const { userId } = await auth()
  if (!userId) redirect('/')
  const courses = await db.course.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return (
    <PlaceholderContent>
      <CourseGrid dataGrid={courses} />
    </PlaceholderContent>
  )
}

export default CoursesPage
