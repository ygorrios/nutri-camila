import { MoreHorizontal, Pencil, Trash } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from 'src/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

import { useToast } from 'src/hooks/use-toast'
import { DeleteModal } from '../modals/delete-modal'

interface DataTableRowActionsProps<T> {
  row: T
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
  onEditUrl?: string
}

const DataTableRowActions = <T extends { original: { id: string } }>({
  row,
  onEdit,
  onDelete,
  onEditUrl,
}: DataTableRowActionsProps<T>) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const onConfirm = async () => {
    try {
      setIsLoading(true)
      await onDelete?.(row?.original?.id)
      toast({
        description: 'Foi excluído com sucesso.',
      })
      setIsDeleteOpen(false)
    } catch (error) {
      setIsDeleteOpen(false)
      toast({
        description: 'Teve um erro ao tentar excluir.',
        variant: 'destructive',
      })
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DropdownMenu>
      <DeleteModal
        isDeleteOpen={isDeleteOpen}
        setIsDeleteOpen={setIsDeleteOpen}
        onDelete={onConfirm}
        isLoading={isLoading}
      />
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'>
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {onEdit ? (
          <DropdownMenuItem onClick={() => onEdit?.(row.original?.id)}>
            <Pencil className='mr-2 h-4 w-4' />
            Edit
          </DropdownMenuItem>
        ) : (
          <Link href={onEditUrl || '/app/'}>
            <DropdownMenuItem>
              <Pencil className='mr-2 h-4 w-4' />
              Editar
            </DropdownMenuItem>
          </Link>
        )}
        <DropdownMenuSeparator />
        {onDelete && (
          <DropdownMenuItem onClick={() => setIsDeleteOpen(true)}>
            <Trash className='mr-2 h-4 w-4' />
            Delete
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DataTableRowActions
