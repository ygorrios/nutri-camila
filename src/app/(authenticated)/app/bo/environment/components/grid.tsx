'use client'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import * as React from 'react'
import { TooltipAcre } from 'src/components/tooltip-acre'

// import { useUser } from '@clerk/nextjs'
import {
  ArrowDownUp,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Pencil,
  PlusIcon,
  X,
} from 'lucide-react'
import { useSession } from 'next-auth/react'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { LoadingPage } from 'src/components/loading-page'
import { Button } from 'src/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from 'src/components/ui/dropdown-menu'
import { Input } from 'src/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'src/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'src/components/ui/table'

export type Envs = {
  id: number
  name: string
  isGlobal: boolean
  createdBy: string
}

export const columns = ({ router, isAdmin, email }: { router: AppRouterInstance; isAdmin: boolean; email: string }) =>
  [
    {
      accessorKey: 'name',
      minSize: 10,
      maxSize: 40,
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            className='m-0 p-2 w-25'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Name
            <ArrowDownUp className='ml-2 w-4 h-4' />
          </Button>
        )
      },
      cell: ({ row }) => <div className='ml-2 capitalize'>{row.getValue('name')}</div>,
    },
    {
      accessorKey: 'isGlobal',
      minSize: 20,
      maxSize: 40,
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            className='m-0 p-2'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Is Global?
            <ArrowDownUp className='ml-2 w-4 h-4' />
          </Button>
        )
      },
      cell: ({ row }) => {
        const isGlobalComponent = row.getValue('isGlobal') ? <Check className='w-4 h-4' /> : <X className='w-4 h-4' />
        return <div className='ml-9'>{isGlobalComponent}</div>
      },
    },
    {
      accessorKey: 'createdBy',
      minSize: 100,
      maxSize: 100,
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            className='m-0 p-2'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Created By
            <ArrowDownUp className='ml-2 w-4 h-4' />
          </Button>
        )
      },
      cell: ({ row }) => <div className='ml-2 lowercase'>{row.getValue('createdBy')}</div>,
    },
    {
      id: 'actions',
      header: () => <div className='text-right mr-2'>Actions</div>,
      minSize: 10,
      maxSize: 10,
      enableHiding: false,
      cell: ({ row }) => {
        const rowValue = row?.original
        if (rowValue?.createdBy !== email && !isAdmin) {
          return null
        }
        //hide edit button if user is not admin or creator
        // eslint-disable-next-line react-hooks/rules-of-hooks

        return (
          <div className='text-right mr-4'>
            <TooltipAcre text='Edit Environment' delayDuration={100}>
              <Button className='h-8' variant='ghost' size='icon' onClick={() => router.push(`${rowValue?.id}`)}>
                <Pencil className='ml-2 w-4 h-4' />
                <span className='sr-only'>Edit Environment</span>
              </Button>
            </TooltipAcre>
          </div>
        )
      },
    },
  ] as ColumnDef<Envs>[]

interface envsProps {
  envs: any
}

const EnvsGrid = ({ envs = [] }: envsProps) => {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const { data: session } = useSession()
  // const { user }: any = useUser()
  const router = useRouter()
  const table = useReactTable({
    data: envs,
    columns: React.useMemo(
      () => columns({ router, isAdmin: session?.user?.isAdmin || false, email: session?.user?.email || '' }),
      [],
    ),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })
  const searchParams = useSearchParams()
  const clientId = Number(searchParams.get('clientId'))
  const [loading, setLoading] = React.useState(false)
  const pathname = usePathname()

  return (
    <div className='w-full'>
      <div className='flex items-start gap-x-5 py-4'>
        <Input
          placeholder='Filter Envs...'
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
          className='max-w-sm'
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline'>
              Columns <ChevronDown className='ml-2 w-4 h-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {table
              ?.getAllColumns()
              ?.filter((column) => column.getCanHide())
              ?.map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className='capitalize'
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button className='ml-auto' onClick={() => router.push('/app/bo/environment/add')}>
          <span className='sr-only'>Add</span>
          <PlusIcon className='w-4 h-4' />
          Add
        </Button>
      </div>
      <div className='border rounded-md'>
        <Table>
          {loading && <LoadingPage />}
          <TableHeader className='top-0 sticky bg-stone-200 dark:bg-stone-700 border-b-2 border-border rounded-t-md w-full h-10'>
            {table?.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      style={{
                        minWidth: header.column.columnDef.minSize,
                        maxWidth: header.column.columnDef.maxSize,
                      }}
                      key={header.id}
                    >
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table?.getRowModel().rows?.length ? (
              table?.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      style={{
                        minWidth: cell.column.columnDef.minSize,
                        maxWidth: cell.column.columnDef.maxSize,
                      }}
                      key={cell.id}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex justify-end items-center space-x-2 py-4'>
        <div className='flex-1 text-muted-foreground text-sm'>
          {`${table.getState().pagination.pageIndex * table.getState().pagination.pageSize} of ${table.getFilteredRowModel().rows.length} row(s) selected.`}
        </div>
        <div className='flex items-center space-x-6 lg:space-x-8'>
          <div className='flex items-center space-x-2'>
            <p className='font-medium text-sm'>Rows</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value))
              }}
            >
              <SelectTrigger className='w-[70px] h-8'>
                <SelectValue placeholder={table.getState().pagination.pageSize} />
              </SelectTrigger>
              <SelectContent side='top'>
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className='flex items-center space-x-2'>
          <Button
            variant='outline'
            className='lg:flex hidden p-0 w-8 h-8'
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className='sr-only'>Go to first page</span>
            <ChevronsLeft className='w-4 h-4' />
          </Button>
          <Button
            variant='outline'
            className='p-0 w-8 h-8'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className='sr-only'>Go to previous page</span>
            <ChevronLeft className='w-4 h-4' />
          </Button>
          <Button
            variant='outline'
            className='p-0 w-8 h-8'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className='sr-only'>Go to next page</span>
            <ChevronRight className='w-4 h-4' />
          </Button>
          <Button
            variant='outline'
            className='lg:flex hidden p-0 w-8 h-8'
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className='sr-only'>Go to last page</span>
            <ChevronsRight className='w-4 h-4' />
          </Button>
        </div>
      </div>
    </div>
  )
}

export { EnvsGrid }
