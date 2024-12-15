import { Loader2 } from 'lucide-react'
import { ResponsiveDialog } from '../responsive-dialog'
import { Button } from '../ui/button'

interface DeleteModalProps {
  onDelete: () => void
  isDeleteOpen: boolean
  setIsDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>
  isLoading: boolean
  title?: string
  description?: string
}

const DeleteModal = ({ title, description, isDeleteOpen, setIsDeleteOpen, onDelete, isLoading }: DeleteModalProps) => (
  <ResponsiveDialog
    isOpen={isDeleteOpen}
    setIsOpen={setIsDeleteOpen}
    title={title || 'Você realmente tem certeza?'}
    description={description || 'Isso não pode ser desfeito'}
  >
    <div className='w-full flex justify-center sm:space-x-6'>
      <Button
        // size='lg'
        variant='outline'
        disabled={isLoading}
        className='w-full hidden sm:block border-gray-400'
        type='button'
        onClick={() => setIsDeleteOpen(false)}
      >
        Cancelar
      </Button>
      <Button onClick={() => onDelete()} disabled={isLoading} className='w-full bg-red-500 hover:bg-red-400'>
        {isLoading ? (
          <>
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            Excluindo...
          </>
        ) : (
          <span>Excluir</span>
        )}
      </Button>
    </div>
  </ResponsiveDialog>
)
export { DeleteModal }
