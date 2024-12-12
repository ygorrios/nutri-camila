const hasRolePermissionBySession = (session: any, role: any) => {
  if (
    !session ||
    !session.user ||
    !session.user.organizationMemberships ||
    session.user.organizationMemberships.length === 0
  ) {
    return null // Return null if the user is not a basic member
  }

  const organizationMemberships = session.user.organizationMemberships

  // Loop through all organization memberships
  for (const membership of organizationMemberships) {
    if (membership?.role?.toLowerCase() === role?.toLowerCase()) {
      return true // Return the role in lowercase if it exists
    }
  }

  return null // Return null if no role is found in the memberships
}

const hasRolePermissionByOrganizations = (organizations: any, role: any) => {
  if (!organizations || organizations.length === 0) {
    return null // Return null if the user is not a basic member
  }

  // Loop through all organization memberships
  for (const membership of organizations) {
    if (membership?.role?.toLowerCase() === role?.toLowerCase()) {
      return true // Return the role in lowercase if it exists
    }
  }

  return null // Return null if no role is found in the memberships
}

export { hasRolePermissionBySession, hasRolePermissionByOrganizations }
