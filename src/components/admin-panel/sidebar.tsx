import Link from 'next/link'

import { Menu } from 'src/components/admin-panel/menu'
import { useSidebarToggle } from 'src/hooks/use-sidebar-toggle'
import { useStore } from 'src/hooks/use-store'
import { cn } from 'src/lib/utils'
import { Logo } from '../logo'

const Sidebar = () => {
  const sidebar = useStore(useSidebarToggle, (state) => state)

  if (!sidebar) return null

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300 w-72',
      )}
    >
      <div className='relative flex flex-col px-3 py-4 overflow-y-auto shadow-md'>
        <Link href='/app/' className='flex gap-2 justify-center mb-2'>
          <div
            className={cn(
              'flex font-bold text-lg whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300 translate-x-0 opacity-100 py-2',
            )}
          >
            <Logo width={100} />
          </div>
        </Link>
        <Menu isOpen={sidebar?.isOpen} />
      </div>
    </aside>
  )
}

export { Sidebar }
