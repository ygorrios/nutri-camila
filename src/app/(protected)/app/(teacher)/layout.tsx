import AdminPanelLayout from 'src/components/admin-panel/admin-panel-layout'
import { ContentLayout } from 'src/components/admin-panel/content-layout'

const TeacherLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <AdminPanelLayout>
      <ContentLayout isTeacherPage>{children}</ContentLayout>
    </AdminPanelLayout>
  )
}

export default TeacherLayout
