'use server'

import { getEnvironment } from 'src/model/branchOpenerModel'
import { getCurrentUser } from '../get-current-user'

export const getEnvs = async () => {
  const user = await getCurrentUser()

  if (!user) {
    return []
  }

  const result = await getEnvironment({ isOnlyGlobal: true, userEmail: user?.email || '' })
  return result
}
