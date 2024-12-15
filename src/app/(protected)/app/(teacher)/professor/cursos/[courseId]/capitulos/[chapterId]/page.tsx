import { auth } from '@clerk/nextjs/server'
import { Eye, LayoutDashboard, Video } from 'lucide-react'
import { redirect } from 'next/navigation'
import { Banner } from 'src/components/banner'
import PlaceholderContent from 'src/components/default-page'
import { IconBadge } from 'src/components/icon-badge'
import { db } from 'src/lib/db'
import ChapterAccessForm from './_components/chapter-access-form'
import ChapterActions from './_components/chapter-actions'
import ChapterDescriptionForm from './_components/chapter-description-form'
import ChapterTitleForm from './_components/chapter-title-form'
import ChapterVideoForm from './_components/chapter-video-form'

export interface IChapterIdPageProps {
  params: {
    courseId: string
    chapterId: string
  }
}

export default async function ChapterIdPage({ params }: IChapterIdPageProps) {
  const paramsResult = await params
  const { userId } = await auth()
  if (!userId) return redirect('/')

  const chapter = await db.chapter.findUnique({
    where: {
      id: paramsResult.chapterId,
      courseId: paramsResult.courseId,
    },
    include: {
      muxData: true,
    },
  })

  if (!chapter) return redirect('/')

  const requiredFields = [chapter.title, chapter.description, chapter.videoUrl]

  const totalFields = requiredFields.length
  const completedFields = requiredFields.filter(Boolean).length
  const completedText = `${completedFields}/${totalFields}`

  const isCompleted = requiredFields.every(Boolean)

  return (
    <PlaceholderContent
      pathBack={`/app/professor/cursos/${paramsResult.courseId}`}
      pathBackText='Voltar a configuração do curso'
      header={
        !chapter.isPublished && (
          <Banner label='Esse capítulo não foi publicado. Ele não aparecerá no curso' variant='warning' />
        )
      }
    >
      <div className='flex items-center justify-between'>
        <div className='w-full'>
          <div className='flex items-center justify-between w-full'>
            <div className='flex flex-col gap-y-2'>
              <h1 className='text-2xl font-medium'>Criação de capítulo</h1>
              <span className='text-sm text-slate-700'>Complete todos os campos obrigatórios {completedText}</span>
            </div>
            <ChapterActions
              disabled={!isCompleted}
              courseId={paramsResult.courseId}
              chapterId={paramsResult.chapterId}
              isPublished={chapter.isPublished}
            />
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-16'>
        <div className='space-y-4'>
          <div>
            <div className='flex items-center gap-x-2'>
              <IconBadge icon={LayoutDashboard} />
              <h2 className='text-xl'>Customize seu capítulo</h2>
            </div>
            <ChapterTitleForm
              initialData={chapter}
              courseId={paramsResult.courseId}
              chapterId={paramsResult.chapterId}
            />
            <ChapterDescriptionForm
              initialData={chapter}
              courseId={paramsResult.courseId}
              chapterId={paramsResult.chapterId}
            />
          </div>
          <div>
            <div className='flex items-center gap-x-2'>
              <IconBadge icon={Eye} />
              <h2 className='text-xl'>Configuração de acesso</h2>
            </div>
            <ChapterAccessForm
              initialData={chapter}
              courseId={paramsResult.courseId}
              chapterId={paramsResult.chapterId}
            />
          </div>
        </div>
        <div>
          <div className='flex items-center gap-x-2'>
            <IconBadge icon={Video} />
            <h2 className='text-xl'>Adicionar vídeo</h2>
          </div>
          <ChapterVideoForm initialData={chapter} courseId={paramsResult.courseId} chapterId={paramsResult.chapterId} />
        </div>
      </div>
    </PlaceholderContent>
  )
}
