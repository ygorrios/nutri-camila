'use server'

import { auth } from 'src/auth'

export const getCurrentUser = async () => {
  const session = await auth()
  if (!session) {
    return null
  }

  const user = session.user
  if (!user) {
    return null
  }

  return user
}
