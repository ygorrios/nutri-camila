import { Navbar } from 'src/components/admin-panel/navbar'

interface ContentLayoutProps {
  title: string
  children: React.ReactNode
}

const ContentLayout = async ({ title, children }: ContentLayoutProps) => {
  return (
    <div>
      <Navbar title={title} />
      {/* <div className='mt-6 mb-6 px-4 sm:px-6 lg:px-8'> */}
      {/* <div className='container pt-8 pb-8 px-4 sm:px-8'>{children}</div> */}
      <div className='px-4 sm:px-8'>{children}</div>
    </div>
  )
}

export { ContentLayout }
