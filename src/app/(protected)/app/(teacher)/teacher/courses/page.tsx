import { auth } from '@clerk/nextjs/server'
import { NextPage } from 'next'
import { redirect } from 'next/navigation'
import { db } from 'src/lib/db'
import { columns } from './_components/columns'
import { DataTable } from './_components/data-table'

interface Props {}

async function getData(): Promise<any> {
  // Fetch data from your API here.
  return [
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'm@example.com',
    },
    // ...
  ]
}
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
    <div className='p-6'>
      <DataTable columns={columns} data={courses} />
    </div>
  )
}

export default CoursesPage
