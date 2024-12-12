import { ClerkProvider } from '@clerk/nextjs'
import { GeistSans } from 'geist/font/sans'
import { NextPage } from 'next'
import Link from 'next/link'
import { Navbar } from 'src/components/admin-panel/navbar'
import { Logo } from 'src/components/logo'
import { ConfettiProvider } from 'src/components/providers/confetti-provider'
import { cn } from 'src/lib/utils'
import { ThemeProvider } from 'src/providers/theme-provider'
import { ToasterProvider } from 'src/providers/toaster-provider'
import 'src/styles/globals.css'

interface Props {
  children: React.ReactNode
}

const DashboardLayout: NextPage<Props> = ({ children }) => {
  return (
    <ClerkProvider afterSignOutUrl='/'>
      <html lang='en'>
        <body className={cn('h-full', GeistSans.className)}>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
            <ConfettiProvider />
            <ToasterProvider />
            <header className='absolute inset-x-0 top-0 z-50 border-b'>
              <nav aria-label='Global' className='flex items-center justify-between p-6 lg:px-8'>
                <div className='flex lg:flex-1'>
                  <Link href='/app/'>
                    <Logo width={80} />
                  </Link>
                </div>
                <div className='lg:flex lg:flex-1 lg:justify-end'>
                  <Navbar />
                </div>
              </nav>
            </header>

            <div className='relative isolate px-6 lg:px-8'>
              <div
                aria-hidden='true'
                className='absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'
              >
                <div
                  style={{
                    clipPath:
                      'polygon(52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%)',
                  }}
                  className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
                />
              </div>
              <div className='mx-auto max-w-2xl py-24 sm:py-20 lg:py-28'>
                <div className='text-center'>
                  <p className='text-balance text-4xl font-semibold tracking-tight text-gray-900'>
                    Introdução Alimentar de Sucesso
                  </p>
                  <p className='mt-2 text-pretty text-md font-medium text-gray-500'>
                    Se você está em busca de um acompanhamento nutricional estou aqui para ajudar!
                  </p>
                  <div className='mt-5 flex items-center justify-center gap-x-6'>{children}</div>
                </div>
              </div>
              <div
                aria-hidden='true'
                className='absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]'
              >
                <div
                  style={{
                    clipPath:
                      'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                  }}
                  className='relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5]  opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]'
                />
              </div>
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}

export default DashboardLayout
