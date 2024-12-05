import { MenuIcon } from 'lucide-react'
import Link from 'next/link'

import { Menu } from 'src/components/admin-panel/menu'
import { Button } from 'src/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from 'src/components/ui/sheet'
import { Logo } from '../logo'

const SheetMenu = async () => {
  return (
    <Sheet>
      <SheetTrigger className='lg:hidden' asChild>
        <Button className='h-8' variant='outline' size='icon'>
          <MenuIcon size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent className='sm:w-72 px-3 h-full flex flex-col' side='left'>
        <SheetTitle></SheetTitle>
        <SheetHeader>
          <Button className='flex justify-center items-center' variant='link' asChild>
            <Link href='/dashboard' className='flex items-center gap-2'>
              <Logo />
            </Link>
          </Button>
        </SheetHeader>
        <Menu isOpen />
      </SheetContent>
    </Sheet>
  )
}

export { SheetMenu }
