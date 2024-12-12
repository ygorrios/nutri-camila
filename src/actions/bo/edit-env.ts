'use server'

import { editEnvironment } from 'src/model/branchOpenerModel'
import { getCurrentUser } from '../get-current-user'

export const editEnv = async (data: any) => {
  const user = await getCurrentUser()

  if (!user) {
    return []
  }

  const result = await editEnvironment({ ...data, createdBy: user?.email })
  return result
}
