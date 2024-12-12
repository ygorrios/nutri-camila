import { auth } from '@clerk/nextjs/server'
import Mux from '@mux/mux-node'
import { NextResponse } from 'next/server'
import { db } from 'src/lib/db'

const { video } = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET,
})

export async function DELETE(req: Request, { params }: { params: { courseId: string; chapterId: string } }) {
  try {
    const paramsResult = await params
    const { userId } = await auth()
    if (!userId) return new NextResponse('Unauthorized', { status: 401 })
    const courseOwner = await db.course.findUnique({
      where: {
        id: paramsResult.courseId,
        userId: userId,
      },
    })
    if (!courseOwner) return new NextResponse('Unauthorized', { status: 401 })

    const chapter = await db.chapter.delete({
      where: {
        id: paramsResult.chapterId,
        courseId: paramsResult.courseId,
      },
    })

    if (!chapter) {
      return new NextResponse('Not Found', { status: 404 })
    }

    if (chapter.videoUrl) {
      const existingMuxData = await db.muxData.findFirst({
        where: {
          chapterId: paramsResult.chapterId,
        },
      })

      if (existingMuxData) {
        await video.assets.delete(existingMuxData.assetId)
        await db.muxData.delete({
          where: {
            id: existingMuxData.id,
          },
        })
      }
    }

    const deletedChapter = await db.chapter.delete({
      where: {
        id: paramsResult.chapterId,
        courseId: paramsResult.courseId,
      },
    })

    const publishedChaptersInCourse = await db.chapter.findMany({
      where: {
        courseId: paramsResult.courseId,
        isPublished: true,
      },
    })

    if (!publishedChaptersInCourse.length) {
      await db.course.update({
        where: {
          id: paramsResult.courseId,
        },
        data: {
          isPublished: false,
        },
      })
    }

    return NextResponse.json(deletedChapter)
  } catch (error) {
    console.log('[CHAPTER-ID]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function PATCH(req: Request, { params }: { params: { courseId: string; chapterId: string } }) {
  try {
    const paramsResult = await params
    const { userId } = await auth()
    const { isPublished, ...values } = await req.json()
    if (!userId) return new NextResponse('Unauthorized', { status: 401 })
    const courseOwner = await db.course.findUnique({
      where: {
        id: paramsResult.courseId,
        userId: userId,
      },
    })
    if (!courseOwner) return new NextResponse('Unauthorized', { status: 401 })

    const chapter = await db.chapter.update({
      where: {
        id: paramsResult.chapterId,
        courseId: paramsResult.courseId,
      },
      data: {
        ...values,
      },
    })

    if (values.videoUrl) {
      const existingMuxData = await db.muxData.findFirst({
        where: {
          chapterId: paramsResult.chapterId,
        },
      })

      if (existingMuxData) {
        await video.assets.delete(existingMuxData.assetId)
        await db.muxData.delete({
          where: {
            id: existingMuxData.id,
          },
        })
      }

      const asset = await video.assets.create({
        input: values.videoUrl,
        playback_policy: ['public'],
        test: false,
      })

      await db.muxData.create({
        data: {
          assetId: asset.id,
          playbackId: asset.playback_ids?.[0]?.id,
          chapterId: paramsResult.chapterId,
        },
      })
    }

    return NextResponse.json(chapter)
  } catch (error) {
    console.log('[CHAPTER-ID]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
