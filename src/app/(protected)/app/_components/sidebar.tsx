import { NextPage } from 'next'
import Link from 'next/link'
import { Logo } from 'src/components/logo'
import SidebarRoutes from './sidebar-routes'

interface Props {}

const Sidebar: NextPage<Props> = ({}) => {
  return (
    <div className='h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm'>
      <div className='p-6 flex justify-center'>
        <Link href='/app'>
          <Logo width={80} />
        </Link>
      </div>
      <div className='flex flex-col w-full'>
        <SidebarRoutes />
      </div>
    </div>
  )
}

export default Sidebar
