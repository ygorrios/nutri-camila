'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Course } from '@prisma/client'
import axios from 'axios'
import { Pencil } from 'lucide-react'
import { NextPage } from 'next'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Button } from 'src/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from 'src/components/ui/form'
import { Input } from 'src/components/ui/input'
import * as z from 'zod'

interface Props {
  initialData: Course
  courseId: string
}
const formSchema = z.object({
  title: z.string().min(1, {
    message: 'O título é obrigatório',
  }),
})

const TitleForm: NextPage<Props> = ({ initialData, courseId }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  })
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const { isSubmitting, isValid } = form.formState
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/cursos/${courseId}`, values)
      toast.success('Título atualizado com sucesso')
      setIsEditing((prev) => !prev)
      router.refresh()
    } catch (error) {
      toast.error('Ocorreu um erro ao atualizar o título')
    }
  }
  return (
    <div className='mt-6 border  rounded-md p-4'>
      <div className='font-medium flex items-center justify-between'>
        Título do curso
        <Button onClick={() => setIsEditing((prev) => !prev)} variant='ghost'>
          {isEditing && <>Cancelar</>}
          {!isEditing && (
            <>
              <Pencil className='h-4 w-4 mr-2' />
              Editar título
            </>
          )}
        </Button>
      </div>
      {!isEditing && <p className='text-sm mt-2'>{initialData.title}</p>}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 mt-4'>
            <FormField
              name='title'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input disabled={isSubmitting} placeholder="e.g. 'Curso avançado de finanças'" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex items-center gap-x-2'>
              <Button disabled={!isValid || isSubmitting} className='ml-auto' type='submit'>
                Salvar
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}

export default TitleForm
