import { auth } from '@clerk/nextjs/server'
import { LogOut } from 'lucide-react'
import Link from 'next/link'
import { SheetMenu } from 'src/components/admin-panel/sheet-menu'
import { isTeacherServer } from 'src/lib/teacher'
import { cn } from 'src/lib/utils'
import { Button } from '../ui/button'
import { UserNav } from './user-nav'

interface NavbarProps {
  isTeacherPage?: boolean
}

const Navbar = async ({ isTeacherPage }: NavbarProps) => {
  const { userId } = await auth()
  const isTeacher = await isTeacherServer(userId)

  return (
    <header
      className={cn(
        'sticky top-0 z-10 w-full',
        isTeacherPage &&
          'bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary',
      )}
    >
      <div className='mx-4 sm:mx-8 flex h-14 items-center'>
        {isTeacherPage && (
          <div className='flex items-center space-x-4 lg:space-x-0'>
            <SheetMenu />
            {/* <h1 className='font-bold'>{title}</h1> */}
          </div>
        )}
        <div className='flex flex-1 items-center justify-start'>
          {/* {isCoursePage && !isTeacherPage && (
            <div className='flex gap-x-2'>
              <Link href='/app'>
                <Button size='sm' variant='ghost'>
                  <ArrowLeft className='h-4 w-4 mr-2' />
                  Voltar
                </Button>
              </Link>
            </div>
          )} */}
        </div>
        <div className='flex flex-1 items-center justify-end gap-x-2'>
          {isTeacherPage ? (
            <Link href='/app/'>
              <Button size='sm' variant='ghost'>
                <LogOut className='h-4 w-4 mr-2' />
                Sair do Portal
              </Button>
            </Link>
          ) : isTeacher ? (
            <Link href='/app/professor/cursos'>
              <Button size='sm' variant='ghost'>
                Entrar no Portal
              </Button>
            </Link>
          ) : null}
          <UserNav />
        </div>
      </div>
    </header>
  )
}

export { Navbar }
