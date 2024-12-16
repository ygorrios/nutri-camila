import { File } from 'lucide-react'
import { redirect } from 'next/navigation'

import { getChapter } from 'src/actions/get-chapter'
import { Banner } from 'src/components/banner'
import { Preview } from 'src/components/preview'
import { Separator } from 'src/components/ui/separator'

import { auth } from '@clerk/nextjs/server'
import { CourseEnrollButton } from './_components/course-enroll-button'
import { CourseProgressButton } from './_components/course-progress-button'
import { VideoPlayer } from './_components/video-player'

const ChapterIdPage = async ({ params }: { params: Promise<{ courseId: string; chapterId: string }> }) => {
  const paramsResult = await params
  const { userId } = await auth()

  if (!userId) {
    return redirect('/')
  }

  const { chapter, course, muxData, attachments, nextChapter, userProgress, purchase } = await getChapter({
    userId,
    chapterId: paramsResult.chapterId,
    courseId: paramsResult.courseId,
  })

  if (!chapter || !course) {
    return redirect('/')
  }

  const isLocked = !chapter.isFree && !purchase
  const completeOnEnd = !!purchase && !userProgress?.isCompleted

  return (
    <div>
      {userProgress?.isCompleted && <Banner variant='success' label='Você já completou esse capítulo' />}
      {isLocked && <Banner variant='warning' label='Você precisa de comprar esse curso pra assistir esse capítulo.' />}
      <div className='flex flex-col max-w-4xl mx-auto pb-20'>
        <div className='p-4'>
          <VideoPlayer
            chapterId={paramsResult.chapterId}
            title={chapter.title}
            courseId={paramsResult.courseId}
            nextChapterId={nextChapter?.id}
            playbackId={muxData?.playbackId!}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
          />
        </div>
        <div>
          <div className='p-4 flex flex-col md:flex-row items-center justify-between'>
            <h2 className='text-2xl font-semibold mb-2'>{chapter.title}</h2>
            {purchase ? (
              <CourseProgressButton
                chapterId={paramsResult.chapterId}
                courseId={paramsResult.courseId}
                nextChapterId={nextChapter?.id}
                isCompleted={!!userProgress?.isCompleted}
              />
            ) : (
              <CourseEnrollButton courseId={paramsResult.courseId} price={course.price!} />
            )}
          </div>
          <Separator />
          <div>
            <Preview value={chapter.description!} />
          </div>
          {!!attachments.length && (
            <>
              <Separator />
              <div className='p-4'>
                {attachments.map((attachment) => (
                  <a
                    href={attachment.url}
                    target='_blank'
                    key={attachment.id}
                    className='flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline'
                  >
                    <File />
                    <p className='line-clamp-1'>{attachment.name}</p>
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ChapterIdPage
