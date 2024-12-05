import { redirect } from 'next/navigation'
import { getEnv } from 'src/actions/bo/get-env'
import { ContentLayout } from 'src/components/admin-panel/content-layout'
import PlaceholderContent from 'src/components/default-page'
import { FormPage } from '../components/form-page'

const EnvironmentEdit = async ({ params }: { params: Promise<{ id: string }> }) => {
  const paramsResult = await params
  const envId = Number(paramsResult.id) as number
  const envData = await getEnv(envId)
  if (!envData) {
    redirect('/app/bo/environment')
  }
  return (
    <ContentLayout title='Environment Edit'>
      <PlaceholderContent pathBack='/app/bo/environment'>
        <FormPage envData={envData} />
      </PlaceholderContent>
    </ContentLayout>
  )
}

export default EnvironmentEdit
