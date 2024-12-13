import { auth } from '@clerk/nextjs/server'
import { CircleDollarSign, File, LayoutDashboard, ListChecks } from 'lucide-react'
import { NextPage } from 'next'
import { redirect } from 'next/navigation'
import { Banner } from 'src/components/banner'
import PlaceholderContent from 'src/components/default-page'
import { IconBadge } from 'src/components/icon-badge'
import { db } from 'src/lib/db'
import Actions from './_components/actions'
import AttachmentForm from './_components/attachment-form'
import CategoryForm from './_components/category-form'
import ChaptersForm from './_components/chapters-form'
import DescriptionForm from './_components/description-form'
import ImageForm from './_components/image-form'
import PriceForm from './_components/price-form'
import TitleForm from './_components/title-form'

interface Props {
  params: { courseId: string }
}

const CourseIdPage: NextPage<Props> = async ({ params }) => {
  const paramsResult = await params
  const { userId } = await auth()
  if (!userId) redirect('/')
  const course = await db.course.findUnique({
    where: {
      id: paramsResult.courseId,
      userId,
    },
    include: {
      chapters: {
        orderBy: {
          position: 'asc',
        },
      },
      attachments: {
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  })

  const categories = await db.category.findMany({
    orderBy: {
      name: 'asc',
    },
  })

  if (!course) {
    return redirect('/')
  }

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
    course.chapters.some((chapter) => chapter.isPublished),
  ]

  const totalFields = requiredFields.length
  const completedFields = requiredFields.filter(Boolean).length
  const completionText = `(${completedFields}/${totalFields})`

  const isCompleted = requiredFields.every(Boolean)

  return (
    <PlaceholderContent pathBack='/app/teacher/courses'>
      {!course.isPublished && (
        <Banner label='Esse curso não foi publicado. Ele não aparecerá para os estudantes' variant='warning' />
      )}
      <div className='p-6'>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col gap-y-2'>
            <h1 className='text-2xl font-medium'>Configuração do curso</h1>
            <span className='text-sm text-slate-700'>Preencha todos os campos obrigatórios {completionText}</span>
          </div>
          <Actions disabled={!isCompleted} courseId={course.id} isPublished={course.isPublished} />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-16'>
          <div>
            <div className='flex items-center gap-x-2'>
              <IconBadge icon={LayoutDashboard} />
              <h2 className='text-xl'>Customize seu curso</h2>
            </div>
            <TitleForm courseId={course.id} initialData={course} />
            <DescriptionForm courseId={course.id} initialData={course} />
            <ImageForm courseId={course.id} initialData={course} />
            <CategoryForm
              courseId={course.id}
              initialData={course}
              options={categories.map((el) => ({
                value: el.id,
                label: el.name,
              }))}
            />
          </div>
          <div className='space-y-6'>
            <div>
              <div className='flex items-center gap-x-2'>
                <IconBadge icon={ListChecks} />
                <h2 className='text-xl'>Capítulos do curso</h2>
              </div>
              <div>
                <ChaptersForm courseId={course.id} initialData={course} />
              </div>
            </div>
            <div>
              <div className='flex items-center gap-x-2'>
                <IconBadge icon={CircleDollarSign} />
                <h2 className='text-xl'>Venda seu curso</h2>
              </div>
              <PriceForm courseId={course.id} initialData={course} />
            </div>
            <div>
              <div className='flex items-center gap-x-2'>
                <IconBadge icon={File} />
                <h2 className='text-xl'>Recursos e anexos</h2>
              </div>
              <AttachmentForm courseId={course.id} initialData={course} />
            </div>
          </div>
        </div>
      </div>
    </PlaceholderContent>
  )
}

export default CourseIdPage
