'use client'
import { Attachment, Course } from '@prisma/client'
import axios from 'axios'
import { File, Loader2, PlusCircle, X } from 'lucide-react'
import { NextPage } from 'next'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import FileUpload from 'src/components/file-upload'
import { Button } from 'src/components/ui/button'
import * as z from 'zod'

interface Props {
  initialData: Course & { attachments: Attachment[] }
  courseId: string
}
const formSchema = z.object({
  url: z.string().min(1, {
    message: 'O recurso é obrigatório',
  }),
})

const AttachmentForm: NextPage<Props> = ({ initialData, courseId }) => {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/cursos/${courseId}/anexos`, values)
      toast.success('Arquivo incluído com sucesso')
      setIsEditing((prev) => !prev)
      router.refresh()
    } catch (error) {
      toast.error('Ocorreu um erro ao atualizar a imagem')
    }
  }

  const onDelete = async (id: string) => {
    try {
      setDeletingId(id)
      await axios.delete(`/api/cursos/${courseId}/anexos/${id}`)
      toast.success('Arquivo excluído com sucesso')
      router.refresh()
    } catch (error) {
      toast.error('Ocorreu um erro ao excluir o arquivo')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className='mt-6 border  rounded-md p-4'>
      <div className='font-medium flex items-center justify-between'>
        Recursos do curso
        <Button onClick={() => setIsEditing((prev) => !prev)} variant='ghost'>
          {isEditing && <>Cancelar</>}
          {!isEditing && (
            <>
              <PlusCircle className='mr-2 w-4 h-4' />
              Adicionar arquivo
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          {initialData.attachments.length === 0 && (
            <p className='text-slate-500 italic text-sm mt-2'>Nenhum arquivo adicionado</p>
          )}
          {initialData.attachments.length > 0 && (
            <div className='space-y-2'>
              {initialData.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className='flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md'
                >
                  <File className='w-4 h-4 mr-2 flex-shrink-0' />
                  <p className='text-xs line-clamp-1'>{attachment.name}</p>
                  {deletingId === attachment.id && (
                    <div className='ml-auto'>
                      <Loader2 className='w-4 h-4 animate-spin' />
                    </div>
                  )}
                  {deletingId !== attachment.id && (
                    <button onClick={() => onDelete(attachment.id)} className='ml-auto hover:opacity-75 transition'>
                      <X className='w-4 h-4' />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {isEditing && (
        <div>
          <FileUpload
            endpoint='courseAttachment'
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url })
              }
            }}
          />
          <div className='text-xs text-muted-foreground mt-4'>
            Adicione arquivos que seus alunos possam precisar durante o curso
          </div>
        </div>
      )}
    </div>
  )
}

export default AttachmentForm
