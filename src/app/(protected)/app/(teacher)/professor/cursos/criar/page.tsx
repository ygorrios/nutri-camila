'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckIcon, Loader2 } from 'lucide-react'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import PlaceholderContent from 'src/components/default-page'
import { Button } from 'src/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from 'src/components/ui/form'
import { Input } from 'src/components/ui/input'
import { useToast } from 'src/hooks/use-toast'
import axiosApi from 'src/services/api'
import * as z from 'zod'
interface Props {}

const formSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
})

const CreatePage: NextPage<Props> = ({}) => {
  const { toast } = useToast()
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
      toast({
        description: (
          <div className='flex items-center'>
            <CheckIcon className='mr-2' />
            <span>Curso criado com sucesso</span>
          </div>
        ),
      })
      const response = await axiosApi.post('/api/cursos', values)
      router.push(`/app/professor/cursos/${response.data.id}`)
      router.refresh()
    } catch {
      toast({
        description: 'Ocorreu um erro ao criar o curso.',
        variant: 'destructive',
      })
    }
  }

  return (
    <PlaceholderContent pathBack='/app/professor/cursos'>
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
              <Link href='/app/professor/cursos'>
                <Button type='button' variant='ghost'>
                  Cancelar
                </Button>
              </Link>
              <Button type='submit' disabled={!isValid || isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    Criando
                  </>
                ) : (
                  <span>Criar</span>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </PlaceholderContent>
  )
}

export default CreatePage
