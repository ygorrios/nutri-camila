import { Category, Course } from '@prisma/client'
import { db } from 'src/lib/db'
import { getProgress } from './get-progress'

type CourseWithProgressWithCategory = Course & {
  category: Category | null
  chapters: { id: string }[]
  progress: number | null
}

type GetCourseProps = {
  userId: string
  categoryId?: string
  title?: string
}

export const getCourses = async ({
  userId,
  categoryId,
  title,
}: GetCourseProps): Promise<CourseWithProgressWithCategory[]> => {
  try {
    const courses = await db.course.findMany({
      where: {
        isPublished: true,
        categoryId,
        title: {
          contains: title,
        },
      },
      include: {
        category: true,
        chapters: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
          },
        },
        purchases: {
          where: {
            userId,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    const coursesWithProgress: CourseWithProgressWithCategory[] = await Promise.all(
      courses.map(async (course) => {
        if (!course.purchases.length) {
          return {
            ...course,
            progress: null,
          }
        }
        const progressPercentage = await getProgress(userId, course.id)
        return {
          ...course,
          progress: progressPercentage,
        }
      }),
    )
    return coursesWithProgress
  } catch (error) {
    console.log('[GET-COURSES]', error)
    return []
  }
}
