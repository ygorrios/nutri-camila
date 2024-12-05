import NextAuth from 'next-auth'
import { authOptions } from './lib/authOptions'

export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authOptions,
})
