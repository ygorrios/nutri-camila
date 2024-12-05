import { ptBR } from '@clerk/localizations'
import { ClerkProvider } from '@clerk/nextjs'
import { GeistSans } from 'geist/font/sans'
import { cn } from 'src/lib/utils'
import { ThemeProvider } from 'src/providers/theme-provider'
import { ToasterProvider } from 'src/providers/toaster-provider'
import 'src/styles/globals.css'
import { metadataObject } from 'src/utils/metadata'
export const metadata = metadataObject

const GuestLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <ClerkProvider localization={ptBR}>
      <html lang='en' className='h-full' suppressHydrationWarning>
        <body className={cn('h-full', GeistSans.className)}>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
            {children}
            <ToasterProvider />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}

export default GuestLayout
