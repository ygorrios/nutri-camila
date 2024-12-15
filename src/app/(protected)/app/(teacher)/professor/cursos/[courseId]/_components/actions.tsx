'use client'

import axios from 'axios'
import { Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { DeleteModal } from 'src/components/modals/delete-modal'
import { Button } from 'src/components/ui/button'
import { useConfettiStore } from 'src/hooks/use-confetti-store'

export interface IActionsProps {
  disabled?: boolean
  courseId: string
  isPublished: boolean
}

export default function Actions({ disabled, courseId, isPublished }: IActionsProps) {
  const confetti = useConfettiStore()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false)
  const onDelete = async () => {
    try {
      setIsLoading(true)
      await axios.delete(`/api/cursos/${courseId}`)
      toast.success('Curso deletado com sucesso')
      router.push(`/app/professor/cursos`)
      router.refresh()
    } catch {
      toast.error('Ocorreu um erro ao deletar o curso')
    } finally {
      setIsLoading(false)
    }
  }

  const onClick = async () => {
    try {
      setIsLoading(true)
      if (isPublished) {
        await axios.patch(`/api/cursos/${courseId}/ocultar`)
        toast.success('Curso despublicado com sucesso')
      } else {
        await axios.patch(`/api/cursos/${courseId}/publicar`)
        toast.success('Curso publicado com sucesso')
        confetti.onOpen()
      }
      router.refresh()
    } catch {
      toast.error('Ocorreu um erro ao publicar/ocultar o curso')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='flex items-center gap-x-2'>
      <Button onClick={onClick} disabled={disabled || isLoading} variant='outline' size='sm'>
        {isPublished ? 'Ocultar Curso' : 'Publicar Curso'}
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
        Excluir Curso
      </Button>
    </div>
  )
}
