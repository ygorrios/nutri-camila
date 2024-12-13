'use client'

// import { useClerk } from '@clerk/nextjs'
import { useClerk } from '@clerk/nextjs'
import { Avatar, AvatarFallback, AvatarImage } from 'src/components/ui/avatar'
import { Button } from 'src/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'src/components/ui/dropdown-menu'
import { Tooltip, TooltipProvider, TooltipTrigger } from 'src/components/ui/tooltip'
import { getInitials } from 'src/utils'
import { SignOutClient } from './auth-components-client'

const UserNav = () => {
  const { user } = useClerk()
  return (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' className='relative h-8 w-8 rounded-full'>
                <Avatar className='h-8 w-8'>
                  <AvatarImage src={user?.imageUrl || ''} alt='Avatar' />
                  <AvatarFallback className='bg-transparent'>{getInitials(user?.fullName || '')}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
        </Tooltip>
      </TooltipProvider>

      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none'>{user?.firstName || ''}</p>
            <p className='text-xs leading-none text-muted-foreground'>{user?.emailAddresses?.[0]?.emailAddress || ''}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className='w-full'>
          <SignOutClient />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { UserNav }
