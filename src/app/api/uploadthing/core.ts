import { auth } from '@clerk/nextjs/server'
import { isTeacherServer } from 'src/lib/teacher'
import { createUploadthing, type FileRouter } from 'uploadthing/next'

const uploadthing = createUploadthing()

const handleAuth = async () => {
  const { userId } = await auth()
  const isTeacher = await isTeacherServer(userId)
  if (!userId || !isTeacher) throw new Error('Unauthorized')
  return { userId }
}

const handleUploadComplete = ({ metadata, file }: { metadata: any; file: any }) => {
  // This code RUNS ON YOUR SERVER after upload
  console.log('Upload complete for userId:', metadata.userId)
  console.log('file url', file.url)
  // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
  return { uploadedBy: metadata.userId }
}

export const ourFileRouter = {
  courseImage: uploadthing({
    image: {
      maxFileSize: '4MB',
      maxFileCount: 1,
    },
  })
    .middleware(() => handleAuth())
    .onUploadComplete((params) => handleUploadComplete(params)),
  courseAttachment: uploadthing(['text', 'image', 'video', 'audio', 'pdf'])
    .middleware(() => handleAuth())
    .onUploadComplete((params) => handleUploadComplete(params)),
  chapterVideo: uploadthing({ video: { maxFileSize: '512GB', maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete((params) => handleUploadComplete(params)),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
