'use client'
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table'
import { CSSProperties, useState } from 'react'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from 'src/components/ui/table'

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { Button } from 'src/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'src/components/ui/select'
import { LoadingPage } from '../loading-page'

const DEFAULT_REACT_TABLE_COLUMN_WIDTH = 150

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isLoading?: boolean
  setGlobalFilter?: any
  globalFilter?: any
}
const DataTable = <TData, TValue>({
  data,
  columns,
  isLoading,
  setGlobalFilter,
  globalFilter,
}: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
  })
  return (
    <div className='w-full'>
      <div className='rounded-md border'>
        <Table>
          {isLoading && <LoadingPage />}
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    const styles: CSSProperties =
                      header.getSize() !== DEFAULT_REACT_TABLE_COLUMN_WIDTH ? { width: `${header.getSize()}px` } : {}

                    return (
                      <TableHead key={header.id} style={styles}>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    )
                    // const styles: CSSProperties =
                    //   header.getSize() !== DEFAULT_REACT_TABLE_COLUMN_WIDTH ? { width: `${header.getSize()}px` } : {}

                    // return (
                    //   <TableHead
                    //     key={header.id}
                    //     style={{
                    //       minWidth: header.column.columnDef.minSize || 10,
                    //       maxWidth: header.column.columnDef.maxSize || 20,
                    //     }}
                    //   >
                    //     {/* {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())} */}
                    //     {flexRender(header.column.columnDef.header, header.getContext())}
                    //   </TableHead>
                    // )
                  })}
                </TableRow>
              )
            })}
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
          <TableFooter>
            {table.getFooterGroups().map((footerGroup) => {
              return (
                <TableRow key={footerGroup.id}>
                  {footerGroup.headers.map((footer) => {
                    return (
                      <TableCell key={footer.id} colSpan={footer.colSpan}>
                        {flexRender(footer.column.columnDef.footer, footer.getContext())}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableFooter>
        </Table>
      </div>
      <div className='flex items-center justify-end space-x-2 py-4 px-4'>
        <div className='flex-1 text-sm text-muted-foreground'>
          {`${table.getState().pagination.pageIndex * table.getState().pagination.pageSize} of ${table.getFilteredRowModel().rows.length} row(s) selected.`}
        </div>
        <div className='flex items-center space-x-6 lg:space-x-8'>
          <div className='flex items-center space-x-2'>
            <p className='text-sm font-medium'>Rows</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value))
              }}
            >
              <SelectTrigger className='h-8 w-[70px]'>
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
            className='hidden h-8 w-8 p-0 lg:flex'
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className='sr-only'>Go to first page</span>
            <ChevronsLeft className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='h-8 w-8 p-0'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className='sr-only'>Go to previous page</span>
            <ChevronLeft className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='h-8 w-8 p-0'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className='sr-only'>Go to next page</span>
            <ChevronRight className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='hidden h-8 w-8 p-0 lg:flex'
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className='sr-only'>Go to last page</span>
            <ChevronsRight className='h-4 w-4' />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default DataTable
