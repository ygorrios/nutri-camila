'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Button } from 'src/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from 'src/components/ui/form'
import { Input } from 'src/components/ui/input'
import * as z from 'zod'
interface Props {}

const formSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
})

const CreatePage: NextPage<Props> = ({}) => {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      debugger
      const response = await axios.post('/api/courses', values)
      toast.success('Curso criado com sucesso.')
      router.push(`/app/teacher/courses/${response.data.id}`)
      router.refresh()
    } catch {
      toast.error('Ocorreu um erro ao criar o curso.')
    }
  }

  return (
    <div className='max-w-5xl mx-auto flex md:items-center justify-center h-full p-6'>
      <div>
        <h1 className='text-2xl'>Nome do curso</h1>
        <p className='text-sm text-slate-600'>
          Qual nome você gostaria de dar ao curso? Não se preocupe você poderá trocar depois.
        </p>
        <Form {...form}>
          <form className='space-y-8 mt-8' onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título do curso</FormLabel>
                  <FormControl>
                    <Input disabled={isSubmitting} placeholder="e.g. 'Desenvolvimento web avançado'" {...field} />
                  </FormControl>
                  <FormDescription>Oque você ensinará neste curso?</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex items-center gap-x-2'>
              <Link href='/app'>
                <Button type='button' variant='ghost'>
                  Cancelar
                </Button>
              </Link>
              <Button type='submit' disabled={!isValid || isSubmitting}>
                Continuar
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default CreatePage
