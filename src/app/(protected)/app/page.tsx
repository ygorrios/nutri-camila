import { auth } from '@clerk/nextjs/server'
import { NextPage } from 'next'
import { redirect } from 'next/navigation'
import { getCourses } from 'src/actions/get-courses'
import { SearchInput } from 'src/components/search-input'
import { db } from 'src/lib/db'
import { Categories } from './_components/categories'
import CoursesList from './_components/courses-list'

interface Props {
  searchParams: {
    title: string
    categoryId: string
  }
}

const SearchPage: NextPage<Props> = async ({ searchParams }) => {
  const searchParamsResult = await searchParams
  const { userId } = await auth()
  if (!userId) redirect('/')
  const categories = await db.category.findMany({
    orderBy: {
      name: 'asc',
    },
  })

  const courses = await getCourses({
    title: searchParamsResult?.title,
    categoryId: searchParamsResult?.categoryId,
    userId,
  })

  return (
    <div>
      <div className='px-6 pt-6 w-full'>
        <SearchInput />
      </div>
      <div className='p-6 space-y-4'>
        <Categories items={categories} />
        <CoursesList items={courses} />
      </div>
    </div>
  )
}

export default SearchPage
