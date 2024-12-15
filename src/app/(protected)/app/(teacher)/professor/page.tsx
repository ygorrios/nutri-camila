import { auth } from '@clerk/nextjs/server'
import { NextPage } from 'next'
import { redirect } from 'next/navigation'
import PlaceholderContent from 'src/components/default-page'
import { db } from 'src/lib/db'
import { columns } from './cursos/_components/columns'
import { DataTable } from './cursos/_components/data-table'

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
      <DataTable columns={columns} data={courses}  />
    </PlaceholderContent>
  )
}

export default CoursesPage
