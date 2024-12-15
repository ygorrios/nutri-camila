import { Category } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import DataTableColumnHeader from 'src/components/data-table/data-table-column-header'
import DataTableRowActions from 'src/components/data-table/data-table-row-actions'

interface CategoryColumnsProps {
  onEdit: () => void
  onDelete: (id: string) => void
}

const getCategoryColumns = ({ onEdit, onDelete }: CategoryColumnsProps): ColumnDef<Category>[] => [
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Categoria' />,
    cell: ({ row }) => <div className='ml-3'>{row.getValue('name')}</div>,
  },
  {
    id: 'actions',
    minSize: 10,
    maxSize: 40,
    enableHiding: false,
    header: ({ column }) => <DataTableColumnHeader column={column} title='Actions' disableSort />,
    cell: ({ row }) => {
      const editUrl = row?.original?.id ? `/app/professor/categorias/${row.original.id}` : ''
      return <DataTableRowActions row={row} onEditUrl={editUrl} onEdit={onEdit} onDelete={onDelete} />
    },
    size: 50,
  },
]

export { getCategoryColumns }
