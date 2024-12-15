'use client'

import axios from 'axios'
import { Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { DeleteModal } from 'src/components/modals/delete-modal'
import { Button } from 'src/components/ui/button'

export interface IChapterActionsProps {
  disabled?: boolean
  courseId: string
  chapterId: string
  isPublished: boolean
}

export default function ChapterActions({ disabled, courseId, chapterId, isPublished }: IChapterActionsProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false)
  const onDelete = async () => {
    try {
      setIsLoading(true)
      await axios.delete(`/api/cursos/${courseId}/capitulos/${chapterId}`)
      toast.success('Capítulo deletado com sucesso')
      router.refresh()
      router.push(`/app/professor/cursos/${courseId}`)
    } catch {
      toast.error('Ocorreu um erro ao deletar o capítulo')
    } finally {
      setIsLoading(false)
    }
  }

  const onClick = async () => {
    try {
      setIsLoading(true)
      if (isPublished) {
        await axios.patch(`/api/cursos/${courseId}/capitulos/${chapterId}/ocultar`)
        toast.success('Capítulo ocultado com sucesso')
      } else {
        await axios.patch(`/api/cursos/${courseId}/capitulos/${chapterId}/publicar`)
        toast.success('Capítulo publicado com sucesso')
      }
      router.refresh()
    } catch {
      toast.error('Ocorreu um erro ao publicar/ocultar o capítulo')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='flex items-center gap-x-2'>
      <Button onClick={onClick} disabled={disabled || isLoading} variant='outline' size='sm'>
        {isPublished ? 'Ocultar Capítulo' : 'Publicar Capítulo'}
      </Button>
      <DeleteModal
        isDeleteOpen={isDeleteOpen}
        setIsDeleteOpen={setIsDeleteOpen}
        onDelete={onDelete}
        isLoading={isLoading}
      />
      <Button
        size='sm'
        className='bg-red-500 hover:bg-red-400'
        disabled={isLoading}
        onClick={() => setIsDeleteOpen(true)}
      >
        <Trash className='h-4 w-4 mr-2' />
        Excluir Capítulo
      </Button>
    </div>
  )
}
