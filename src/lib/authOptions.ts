import { NextAuthConfig } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { getUserByEmail, logUser } from 'src/model/userModel'
import { getInitials, getUsernameFromEmail } from 'src/utils'

declare module 'next-auth' {
  interface User {
    isAdmin?: boolean // Add isAdmin to the User interface
    initials?: string
    username?: string
  }

  interface Session {
    user: User
  }
}

export const authOptions: NextAuthConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID || '',
      clientSecret: process.env.AUTH_GOOGLE_SECRET || '',
      authorization: {
        url: `https://accounts.google.com/o/oauth2/auth/authorize?response_type=code&prompt=login`,
      },
    }),
  ],
  pages: {
    signIn: '/',
    newUser: '/',
    error: '/',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    signIn: async ({ account, profile }) => {
      if (account?.provider === 'google') {
        const isInternal = !!(
          profile?.email_verified &&
          (profile?.email?.endsWith('@timedatasecurity.com') || profile?.email?.endsWith('@tds.ie'))
        )
        if (isInternal) {
          await logUser({
            email: profile?.email,
            name: profile?.name,
            image: profile?.picture,
            isAdmin: false,
          })

          return true
        }
      }
      return false
    },
    session: async ({ session }) => {
      const user = session.user
      let userData = null
      if (user?.email) {
        userData = await getUserByEmail(user?.email)
      }
      const isAdmin = userData?.isAdmin || false

      return {
        ...session,
        user: {
          ...session.user,
          initials: getInitials(user?.name || ''),
          username: getUsernameFromEmail(user?.email || ''),
          isAdmin,
        },
      } as SessionProps
    },
  },
}
