import { ClerkProvider } from '@clerk/nextjs'
import { GeistSans } from 'geist/font/sans'
import AdminPanelLayout from 'src/components/admin-panel/admin-panel-layout'
import { ContentLayout } from 'src/components/admin-panel/content-layout'
import PlaceholderContent from 'src/components/default-page'
import { ConfettiProvider } from 'src/components/providers/confetti-provider'
import { cn } from 'src/lib/utils'
import { ThemeProvider } from 'src/providers/theme-provider'
import { ToasterProvider } from 'src/providers/toaster-provider'

const TeacherLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider afterSignOutUrl='/'>
      <html lang='en'>
        <body className={cn('h-full', GeistSans.className)}>
          {/* <body className={inter.className}> */}
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
            <ConfettiProvider />
            <ToasterProvider />
            <AdminPanelLayout>
              <ContentLayout isTeacherPage>
                <PlaceholderContent>{children}</PlaceholderContent>
              </ContentLayout>
            </AdminPanelLayout>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}

export default TeacherLayout
