'use client'
import { BarChart, Compass, List } from 'lucide-react'
import { NextPage } from 'next'
import { usePathname } from 'next/navigation'
import SidebarItem from './sidebar-item'

interface Props {}

const guestRoutes = [
  {
    icon: Compass,
    label: 'Courses',
    href: '/app/',
  },
]

const teacherRoutes = [
  {
    icon: List,
    label: 'Courses',
    href: '/app/professor/cursos',
  },
  {
    icon: BarChart,
    label: 'Analytics',
    href: '/app/professor/analytics',
  },
]

const SidebarRoutes: NextPage<Props> = ({}) => {
  const pathname = usePathname()
  const isTeacherPage = pathname?.includes('/teacher')
  const routes = isTeacherPage ? teacherRoutes : guestRoutes
  return (
    <div className='flex flex-col w-full'>
      {routes.map((route) => (
        <SidebarItem key={route.href} icon={route.icon} label={route.label} href={route.href} />
      ))}
    </div>
  )
}

export default SidebarRoutes
