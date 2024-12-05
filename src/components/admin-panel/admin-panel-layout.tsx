'use client'

import { Footer } from 'src/components/admin-panel/footer'
import { Sidebar } from 'src/components/admin-panel/sidebar'
import { useSidebarToggle } from 'src/hooks/use-sidebar-toggle'
import { useStore } from 'src/hooks/use-store'

const AdminPanelLayout = ({ children }: { children: React.ReactNode }) => {
  const sidebar = useStore(useSidebarToggle, (state) => state)

  if (!sidebar) return null

  return (
    <>
      <Sidebar />

      <main className='min-h-[calc(100vh_-_56px)] lg:ml-72'>{children}</main>
      <footer className='lg:ml-72'>
        <Footer />
      </footer>
    </>
  )
}

export default AdminPanelLayout
