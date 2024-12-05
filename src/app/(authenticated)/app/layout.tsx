import { GeistSans } from 'geist/font/sans'
import 'src/styles/globals.css'

import { ptBR } from '@clerk/localizations'
import { ClerkProvider } from '@clerk/nextjs'
import { SessionProvider } from 'next-auth/react'
import AdminPanelLayout from 'src/components/admin-panel/admin-panel-layout'
import { ThemeProvider } from 'src/providers/theme-provider'
import { ToasterProvider } from 'src/providers/toaster-provider'
import { metadataObject } from 'src/utils/metadata'

export const metadata = metadataObject

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <ClerkProvider localization={ptBR}>
      <html lang='en' suppressHydrationWarning>
        <body className={GeistSans.className}>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
            <SessionProvider>
              <AdminPanelLayout>{children}</AdminPanelLayout>
              <ToasterProvider />
            </SessionProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}

export default RootLayout
