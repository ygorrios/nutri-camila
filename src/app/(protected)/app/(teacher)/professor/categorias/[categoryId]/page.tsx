import { auth } from '@clerk/nextjs/server'
import { NextPage } from 'next'
import { redirect } from 'next/navigation'
import { db } from 'src/lib/db'
import FormPage from '../_components/form'
interface Props {
  params: Promise<{ categoryId: string }>
}

const EditPage: NextPage<Props> = async ({ params }) => {
  const paramsResult = await params
  const { userId } = await auth()
  if (!userId) redirect('/')
  const category = await db.category.findUnique({
    where: {
      id: paramsResult.categoryId,
    },
  })

  if (!category) {
    return redirect('/')
  }

  return <FormPage id={category.id} name={category.name} />
}

export default EditPage
