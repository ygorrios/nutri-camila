'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckIcon, Loader2 } from 'lucide-react'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import PlaceholderContent from 'src/components/default-page'
import { Button } from 'src/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from 'src/components/ui/form'
import { Input } from 'src/components/ui/input'
import { useToast } from 'src/hooks/use-toast'
import api from 'src/services/axiosApi'
import * as z from 'zod'
interface Props {
  id?: string
  name?: string
}

const formSchema = z.object({
  name: z.string().min(1, { message: 'Categoria é obrigatório' }),
})

const FormPage: NextPage<Props> = ({ id, name }) => {
  const { toast } = useToast()
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name || '',
    },
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      toast({
        description: (
          <div className='flex items-center'>
            <CheckIcon className='mr-2' />
            <span>Categoria criada com sucesso</span>
          </div>
        ),
      })
      if (id) {
        await api.put(`/api/categorias/${id}`, values)
      } else {
        await api.post('/api/categorias', values)
      }
      router.push('/app/professor/categorias')
      router.refresh()
    } catch {
      toast({
        description: 'Ocorreu um erro ao criar o curso.',
        variant: 'destructive',
      })
    }
  }

  return (
    <PlaceholderContent pathBack='/app/professor/categorias'>
      <div>
        <h1 className='text-2xl'>Categoria</h1>
        <p className='text-sm text-slate-600'>
          Qual nome você gostaria de criar? Não se preocupe você poderá trocar depois.
        </p>
        <Form {...form}>
          <form className='space-y-8 mt-8' onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input disabled={isSubmitting} placeholder="e.g. 'Educação infantil'" {...field} />
                  </FormControl>
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
                {isSubmitting ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    Salvando
                  </>
                ) : (
                  <span>Salvar</span>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </PlaceholderContent>
  )
}

export default FormPage
