import { z } from 'zod'

export type AcreIntranetIp = {
  name: string
  nameOriginal?: string
  ip: string
  ipOriginal?: string
  groups: Group[]
  groupsOriginal?: Group[]
}

export type UpdateSecurityGroup = {
  newSecurityGroupId: string | string[]
  oldSecurityGroupId: string | string[]
  oldIp: string
  newIp: string
  description: string
}

export type Group = {
  id: string
  name: string
}

export const AddAcreIntranetIpZod = z.object({
  ip: z.string(),
  ipOriginal: z.string().optional(),
  nameOriginal: z.string().optional(),
  name: z.string(),
  groups: z.array(z.string()),
  groupsOriginal: z.array(z.string().optional()).optional(),
})

export type AddAcreIntranetIpDto = z.infer<typeof AddAcreIntranetIpZod>
