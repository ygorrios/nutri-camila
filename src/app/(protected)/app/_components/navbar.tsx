'use client'

import { NextPage } from 'next'
import { usePathname } from 'next/navigation'
import { NavbarRoutes } from 'src/components/navbar-routes'
import MobileSidebar from './mobile-sidebar'

interface Props {}

const Navbar: NextPage<Props> = ({}) => {
  const pathname = usePathname()
  const isTeacherPage = pathname?.includes('/teacher')

  return (
    <div className='p-4 border-b h-full flex items-center shadow-sm'>
      {isTeacherPage && <MobileSidebar />}
      <NavbarRoutes />
    </div>
  )
}

export default Navbar
