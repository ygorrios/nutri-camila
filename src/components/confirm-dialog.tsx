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

interface AcreIntranetIpFormProps {
  isOpenConfirmDialog: boolean
  onOpenChangeConfirmDialog: (value: boolean) => void
  onSuccessFn: () => void
}

const ConfirmDialog = ({ isOpenConfirmDialog, onOpenChangeConfirmDialog, onSuccessFn }: AcreIntranetIpFormProps) => {
  return (
    <AlertDialog open={isOpenConfirmDialog} onOpenChange={onOpenChangeConfirmDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your data from our
            servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export { ConfirmDialog }
