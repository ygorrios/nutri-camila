import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from 'src/components/ui/alert-dialog'

interface ConfirmDialogProps {
  isOpenConfirmDialog: boolean
  onOpenChangeConfirmDialog: (value: boolean) => void
  onSuccessFn: () => void
}

const ConfirmDialog = ({ isOpenConfirmDialog, onOpenChangeConfirmDialog, onSuccessFn }: ConfirmDialogProps) => {
  return (
    <AlertDialog open={isOpenConfirmDialog} onOpenChange={onOpenChangeConfirmDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você realmente tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>Isso não pode ser desfeito</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onSuccessFn}>Continuar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export { ConfirmDialog }
