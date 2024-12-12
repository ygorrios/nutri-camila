'use server'

import { addEnvironment } from 'src/model/branchOpenerModel'
import { getCurrentUser } from '../get-current-user'

export const addEnv = async (data: any) => {
  const user = await getCurrentUser()

  if (!user) {
    return []
  }

  const result = await addEnvironment({ ...data, createdBy: user?.email })
  return result
}
