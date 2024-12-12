'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Chapter } from '@prisma/client'
import axios from 'axios'
import { Pencil } from 'lucide-react'
import { NextPage } from 'next'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Editor } from 'src/components/editor'
import { Preview } from 'src/components/preview'
import { Button } from 'src/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from 'src/components/ui/form'
import { cn } from 'src/lib/utils'
import * as z from 'zod'

interface Props {
  initialData: Chapter
  courseId: string
  chapterId: string
}
const formSchema = z.object({
  description: z.string().min(1, {
    message: 'A descrição é obrigatória',
  }),
})

const ChapterDescriptionForm: NextPage<Props> = ({ initialData, courseId, chapterId }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialData.description || '',
    },
  })
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const { isSubmitting, isValid } = form.formState
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values)
      toast.success('Descrição atualizada com sucesso')
      setIsEditing((prev) => !prev)
      router.refresh()
    } catch (error) {
      toast.error('Ocorreu um erro ao atualizar a descrição')
    }
  }
  return (
    <div className='mt-6 border bg-slate-100 rounded-md p-4'>
      <div className='font-medium flex items-center justify-between'>
        Descrição do capítulo
        <Button onClick={() => setIsEditing((prev) => !prev)} variant='ghost'>
          {isEditing && <>Cancelar</>}
          {!isEditing && (
            <>
              <Pencil className='h-4 w-4 mr-2' />
              Editar descrição
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <div className={cn('text-sm mt-2', !initialData.description && 'text-slate-500 italic')}>
          {!initialData.description && 'Sem descrição'}
          {initialData.description && (
            // <span>{initialData.description}</span>
            <Preview value={initialData.description} />
          )}
        </div>
      )}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 mt-4'>
            <FormField
              name='description'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    {/* <Textarea
                      disabled={isSubmitting}
                      placeholder="e.g. 'Aprenda a planejar suas finanças pessoais'"
                      {...field}
                    /> */}
                    <Editor {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex items-center gap-x-2'>
              <Button disabled={!isValid || isSubmitting} type='submit'>
                Salvar
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}

export default ChapterDescriptionForm
