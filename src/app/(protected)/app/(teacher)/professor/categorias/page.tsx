import { auth } from '@clerk/nextjs/server'
import { NextPage } from 'next'
import { redirect } from 'next/navigation'
import PlaceholderContent from 'src/components/default-page'
import { db } from 'src/lib/db'
import { CategoryGrid } from './_components/category-grid'

interface Props {}

const CoursesPage: NextPage<Props> = async ({}) => {
  const { userId } = await auth()
  if (!userId) redirect('/')
  const categories = await db.category.findMany({
    orderBy: {
      name: 'desc',
    },
  })
  return (
    <PlaceholderContent>
      <CategoryGrid dataGrid={categories} />
    </PlaceholderContent>
  )
}

export default CoursesPage
