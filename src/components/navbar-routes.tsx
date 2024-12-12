'use client'

import { UserButton, useSession } from '@clerk/nextjs'
import { ArrowLeft, LogOut } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from 'src/components/ui/button'

import { TEACHER_ROLE } from 'src/lib/contants'
import { hasRolePermissionBySession } from 'src/lib/userRole'

export const NavbarRoutes = () => {
  const { session } = useSession()
  const isTeacher = hasRolePermissionBySession(session, TEACHER_ROLE)

  const pathname = usePathname()

  const isTeacherPage = pathname?.startsWith('/app/teacher')
  const isCoursePage = pathname?.includes('/app/courses')
  const isSearchPage = pathname === '/app/'

  return (
    <>
      {isCoursePage && !isTeacherPage && (
        <div className='flex gap-x-2'>
          <Link href='/app'>
            <Button size='sm' variant='ghost'>
              <ArrowLeft className='h-4 w-4 mr-2' />
              Voltar
            </Button>
          </Link>
        </div>
      )}
      <div className='flex gap-x-2 ml-auto'>
        {isTeacherPage ? (
          <Link href='/app'>
            <Button size='sm' variant='ghost'>
              <LogOut className='h-4 w-4 mr-2' />
              Sair Portal
            </Button>
          </Link>
        ) : isTeacher ? (
          <Link href='/app/teacher/courses'>
            <Button size='sm' variant='ghost'>
              Entrar Portal
            </Button>
          </Link>
        ) : null}
        {/* <UserButton /> */}
      </div>
    </>
  )
}
