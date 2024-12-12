'use client'
import { BarChart, Compass, Layout, List } from 'lucide-react'
import { NextPage } from 'next'
import SidebarItem from './sidebar-item'
import { usePathname } from 'next/navigation'

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
    href: '/app/teacher/courses',
  },
  {
    icon: BarChart,
    label: 'Analytics',
    href: '/app/teacher/analytics',
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
