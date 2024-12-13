'use client'

import { useClerk } from '@clerk/nextjs'
import { LogOut } from 'lucide-react'
import { Button } from '../ui/button'

const SignOutClient = (props: React.ComponentPropsWithRef<typeof Button>) => {
  const { signOut } = useClerk()

  return (
    <Button
      variant='ghost'
      className='cursor-pointer'
      size='sm'
      {...props}
      onClick={() => signOut({ redirectUrl: '/' })}
    >
      <LogOut className='w-4 h-4 mr-3 text-muted-foreground' />
      Logout
    </Button>
  )
}

export { SignOutClient }
