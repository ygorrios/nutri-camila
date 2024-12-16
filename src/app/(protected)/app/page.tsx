import { auth } from '@clerk/nextjs/server'
import { NextPage } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getCourses } from 'src/actions/get-courses'
import { Navbar } from 'src/components/admin-panel/navbar'
import { Logo } from 'src/components/logo'
import { SearchInput } from 'src/components/search-input'
import { db } from 'src/lib/db'
import { Categories } from './_components/categories'
import CoursesList from './_components/courses-list'

interface Props {
  searchParams: Promise<{
    title: string
    categoryId: string
  }>
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
    <>
      <header className='sticky top-0 z-10 w-full border-b'>
        <nav aria-label='Global' className='flex items-center justify-between lg:px-8'>
          <div className='flex lg:flex-1'>
            <Link href='/app/'>
              <Logo width={80} />
            </Link>
          </div>
          <div className='lg:flex lg:flex-1 lg:justify-end'>
            <Navbar />
          </div>
        </nav>
      </header>
      <div className='relative isolate px-6 lg:px-8'>
        <div
          aria-hidden='true'
          className='absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'
        >
          <div
            style={{
              clipPath:
                'polygon(52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%)',
            }}
            className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
          />
        </div>
        <div className='mx-auto max-w-2xl py-16 sm:py-20 lg:py-20'>
          <div className='text-center'>
            <p className='text-balance text-4xl font-semibold tracking-tight text-gray-900'>
              Introdução Alimentar de Sucesso
            </p>
            <p className='mt-2 text-pretty text-md font-medium text-gray-500'>
              Se você está em busca de um acompanhamento nutricional estou aqui para ajudar!
            </p>
            <div className='mt-5 flex items-center justify-center gap-x-6'>
              <div>
                <div className='px-6 pt-6 w-full'>
                  <SearchInput />
                </div>
                <div className='p-6 space-y-4'>
                  <Categories items={categories} />
                  <CoursesList items={courses} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          aria-hidden='true'
          className='absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]'
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className='relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5]  opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]'
          />
        </div>
      </div>
    </>
  )
}

export default SearchPage
