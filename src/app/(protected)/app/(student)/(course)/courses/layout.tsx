import 'src/styles/globals.css'

import { ClerkProvider } from '@clerk/nextjs'
import { GeistSans } from 'geist/font/sans'
import { Inter } from 'next/font/google'
import { ConfettiProvider } from 'src/components/providers/confetti-provider'
import { cn } from 'src/lib/utils'
import { ThemeProvider } from 'src/providers/theme-provider'
import { ToasterProvider } from 'src/providers/toaster-provider'
import { metadataObject } from 'src/utils/metadata'

const inter = Inter({ subsets: ['latin'] })

export const metadata = metadataObject

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider afterSignOutUrl='/'>
      <html lang='en'>
        <body className={cn('h-full', GeistSans.className)}>
          {/* <body className={inter.className}> */}
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
            <ConfettiProvider />
            <ToasterProvider />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
