'use server'

import { getEnvironmentById } from 'src/model/branchOpenerModel'
import { getCurrentUser } from '../core/auth'

export const getEnv = async (envId: number) => {
  const user = await getCurrentUser()

  if (!user) {
    return null
  }

  const result = await getEnvironmentById(Number(envId))
  if (result?.createdBy !== user?.email && result?.isGlobalEnv) {
    return null
  }
  return result
}
