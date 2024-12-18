import { redirect } from 'next/navigation'

import { getAnalytics } from 'src/actions/get-analytics'

import { auth } from '@clerk/nextjs/server'
import { Chart } from './_components/chart'
import { DataCard } from './_components/data-card'
import PlaceholderContent from 'src/components/default-page'

const AnalyticsPage = async () => {
  const { userId } = await auth()

  if (!userId) {
    return redirect('/')
  }

  const { data, totalRevenue, totalSales } = await getAnalytics(userId)

  return (
    <PlaceholderContent>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
        <DataCard label='Total Revenue' value={totalRevenue} shouldFormat />
        <DataCard label='Total Sales' value={totalSales} />
      </div>
      <Chart data={data} />
    </PlaceholderContent>
  )
}

export default AnalyticsPage
