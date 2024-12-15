import { Course } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import DataTableColumnHeader from 'src/components/data-table/data-table-column-header'
import DataTableRowActions from 'src/components/data-table/data-table-row-actions'
import { Badge } from 'src/components/ui/badge'
import { cn } from 'src/lib/utils'

interface CourseColumnsProps {
  onEdit: () => void
  onDelete: () => void
}

const getCourseColumns = ({ onEdit, onDelete }: CourseColumnsProps): ColumnDef<Course>[] => [
  {
    accessorKey: 'title',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Title' />,
    cell: ({ row }) => <div className='ml-3'>{row.getValue('title')}</div>,
  },
  {
    accessorKey: 'price',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Preco' />,
    cell({ row }) {
      const price = parseFloat(row.getValue('price') || '0')
      const formmatPrice = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price)
      return <div>{formmatPrice}</div>
    },
  },
  {
    accessorKey: 'isPublished',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Publicado' />,
    cell({ row }) {
      const isPublished = row.getValue('isPublished') || false
      return <Badge className={cn(!isPublished && 'bg-slate-500')}>{isPublished ? 'Publicado' : 'Rascunho'}</Badge>
    },
  },
  {
    id: 'actions',
    minSize: 10,
    maxSize: 40,
    enableHiding: false,
    header: ({ column }) => <DataTableColumnHeader column={column} title='Actions' disableSort />,
    cell: ({ row }) => {
      const editUrl = row?.original?.id ? `/app/professor/cursos/${row.original.id}` : ''
      return <DataTableRowActions row={row} onEditUrl={editUrl} onEdit={onEdit} onDelete={onDelete} />
    },
    size: 50,
  },
]

export { getCourseColumns }
