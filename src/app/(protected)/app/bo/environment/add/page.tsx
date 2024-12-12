import { ContentLayout } from 'src/components/admin-panel/content-layout'
import PlaceholderContent from 'src/components/default-page'
import { FormPage } from '../components/form-page'

const EnvironmentAdd = () => {
  return (
    <ContentLayout title='Environment Add'>
      <PlaceholderContent pathBack='/app/bo/environment'>
        <FormPage />
      </PlaceholderContent>
    </ContentLayout>
  )
}

export default EnvironmentAdd
