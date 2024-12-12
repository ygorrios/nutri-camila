import { Menu } from 'lucide-react'
import { NextPage } from 'next'
import { Sheet, SheetContent, SheetTrigger } from 'src/components/ui/sheet'
import Sidebar from './sidebar'

interface Props {}

const MobileSidebar: NextPage<Props> = ({}) => {
  return (
    <Sheet>
      <SheetTrigger className='md:hidden pr-4 hover:opacity-75 transition'>
        <Menu />
      </SheetTrigger>
      <SheetContent side='left' className='p-0 bg-white'>
        <Sidebar />
      </SheetContent>
    </Sheet>
  )
}

export default MobileSidebar
