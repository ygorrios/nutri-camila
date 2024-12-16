import { ClerkProvider } from '@clerk/nextjs'
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin'
import { GeistSans } from 'geist/font/sans'
import { ourFileRouter } from 'src/app/api/uploadthing/core'
import { ConfettiProvider } from 'src/components/providers/confetti-provider'
import { cn } from 'src/lib/utils'
import { ThemeProvider } from 'src/providers/theme-provider'
import { ToasterProvider } from 'src/providers/toaster-provider'
import 'src/styles/globals.css'
import { metadataObject } from 'src/utils/metadata'
import { extractRouterConfig } from 'uploadthing/server'

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
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
            <NextSSRPlugin
              /**
               * The `extractRouterConfig` will extract **only** the route configs
               * from the router to prevent additional information from being
               * leaked to the client. The data passed to the client is the same
               * as if you were to fetch `/api/uploadthing` directly.
               */
              routerConfig={extractRouterConfig(ourFileRouter)}
            />
            <ConfettiProvider />
            <ToasterProvider />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
