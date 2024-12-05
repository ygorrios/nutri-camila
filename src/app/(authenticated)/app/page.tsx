import { ContentLayout } from 'src/components/admin-panel/content-layout'
import PlaceholderContent from 'src/components/default-page'

interface SmProps {
  searchParams: any
}

const sm = async ({ searchParams }: SmProps) => {
  const searchParamsResult = await searchParams

  return (
    <ContentLayout title='Secret Manager'>
      <PlaceholderContent>Test</PlaceholderContent>
    </ContentLayout>
  )
}

export default sm
