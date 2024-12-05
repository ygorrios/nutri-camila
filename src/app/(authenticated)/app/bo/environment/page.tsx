import { getEnvs } from 'src/actions/bo/get-envs'
import { ContentLayout } from 'src/components/admin-panel/content-layout'
import PlaceholderContent from 'src/components/default-page'
import { EnvsGrid } from './components/grid'

const Environment = async () => {
  const envs = await getEnvs()
  return (
    <ContentLayout title='Environments'>
      <PlaceholderContent>
        <EnvsGrid envs={envs} />
      </PlaceholderContent>
    </ContentLayout>
  )
}

export default Environment
