import { createClerkClient } from '@clerk/nextjs/server'
import { TEACHER_ROLE } from './contants'
import { hasRolePermissionByOrganizations } from './userRole'

export const isTeacherServer = async (userId?: string | null) => {
  if (!userId || !process.env.CLERK_SECRET_KEY) {
    return false
  }
  
  const clerkClient = createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY,
  })

  const organizations = userId ? await clerkClient.users.getOrganizationMembershipList({ userId }) : null

  if (!organizations || organizations?.data.length === 0) {
    return false
  }

  const isTeacher = hasRolePermissionByOrganizations(organizations?.data, TEACHER_ROLE)

  return isTeacher //userId === process.env.NEXT_PUBLIC_TEACHER_ID;
}
