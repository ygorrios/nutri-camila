'use server'
import { auth, createClerkClient, currentUser } from '@clerk/nextjs/server'

const getCurrentUser = async () => {
  const { userId } = await auth()
  const user = await currentUser()

  // const session = await getAuth(sessionId)
  // console.log('session', session)
  // const isTeacher = has({ permi: 'org:teacher' })
  return { userId, user }
}

export { getCurrentUser }
