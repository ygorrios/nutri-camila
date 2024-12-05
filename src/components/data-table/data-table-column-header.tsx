import { Column } from '@tanstack/react-table'
import { ArrowDownIcon, ArrowUpIcon, ChevronsLeftRightIcon } from 'lucide-react'
import { HTMLAttributes } from 'react'
import { Button } from 'src/components/ui/button'

interface DataTableColumnHeaderProps<TData, TValue> extends HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
  disableSort?: boolean
}

const DataTableColumnHeader = <TData, TValue>({
  column,
  title,
  className,
  disableSort,
}: DataTableColumnHeaderProps<TData, TValue>) => {
  const renderSortIcon = () => {
    const sort = column.getIsSorted()
    if (!sort) {
      return <ChevronsLeftRightIcon className='ml-2 h-4 w-4 rotate-90' />
    }
    return sort === 'desc' ? <ArrowDownIcon className='ml-2 h-4 w-4' /> : <ArrowUpIcon className='ml-2 h-4 w-4' />
  }

  if (!column.getCanSort() || disableSort) {
    return <div className={className}>{title}</div>
  }
  return (
    <div className={className}>
      <Button variant='ghost' size='sm' className='h-8' onClick={column.getToggleSortingHandler()}>
        <span>{title}</span>
        {renderSortIcon()}
      </Button>
    </div>
  )
}

export default DataTableColumnHeader
