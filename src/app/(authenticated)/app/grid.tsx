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
import lodash from 'lodash'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import * as React from 'react'
import { Combobox } from 'src/components/combobox'
import { TooltipAcre } from 'src/components/tooltip-acre'

import {
  ArrowDownUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Copy,
  Eye,
  EyeOff,
} from 'lucide-react'
import Link from 'next/link'
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
import { toast } from 'src/hooks/use-toast'
import { getMatchesFromString } from 'src/utils'
import {
  emailRegex,
  specificPwRegex,
  specificTextRegex,
  urlRegex,
  usernamePasswordSlashRegex,
} from 'src/utils/constants'

export type Clients = {
  clientName: string
  fieldName: string
  fieldData: string
}

const TDSPlainText = ({ prefix, text }: { prefix: string; text: string }) => {
  return (
    <div className='flex items-center flex-row'>
      <span className='text-sm'>
        <b className='capitalize'>{prefix}:</b> {text}
      </span>
      <TooltipAcre text={`Copy ${prefix}`}>
        <Button
          className='h-8 ml-1'
          variant='ghost'
          size='icon'
          onClick={() => {
            navigator.clipboard.writeText(text)
            toast({
              title: `${lodash.capitalize(prefix)} was successfully copied to clipboard`,
            })
          }}
        >
          <Copy className='h-4 w-4' />
          <span className='sr-only'>Copy Username</span>
        </Button>
      </TooltipAcre>
    </div>
  )
}

const TDSPassword = ({ pw }: { pw: string }) => {
  const [show, setShow] = React.useState(false)
  const handleHideShow = () => {
    setShow(!show)
  }
  return (
    <div className='flex flex-row items-center'>
      <span className='text-sm'>
        <b>Password:</b>
      </span>
      {show && <span className='text-sm ml-1'>{pw}</span>}
      <TooltipAcre text={show ? 'Hide Password' : 'Show Password'}>
        <Button className='h-8 ml-1' variant='ghost' size='icon' onClick={handleHideShow}>
          {show ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
          <span className='sr-only'>{show ? 'Hide Password' : 'Show Password'}</span>
        </Button>
      </TooltipAcre>
    </div>
  )
}

const TDSUsernamePassword = ({ username, pw }: { username: string; pw: string }) => {
  return (
    <div className='flex flex-col'>
      <TDSPlainText prefix='Username' text={username} />
      <TDSPassword pw={pw} />
    </div>
  )
}

const ClientFieldData = ({ fieldData }: { fieldData: string }) => {
  return (
    <div>
      {fieldData?.split('\n').map((item, index) => {
        let newItem = item
        const urlsMatch = getMatchesFromString(newItem, urlRegex)
        if (urlsMatch?.length > 0) {
          newItem = newItem.replace(urlRegex, '').trim()
        }
        const emailsMatch = getMatchesFromString(newItem, emailRegex)
        if (emailsMatch?.length > 0) {
          newItem = newItem.replace(emailRegex, '').trim()
        }
        const usernamePasswordMatch = getMatchesFromString(newItem, usernamePasswordSlashRegex)
        if (usernamePasswordMatch?.length > 0) {
          newItem = newItem.replace(usernamePasswordSlashRegex, '').trim()
        }
        const specificTextMatch = getMatchesFromString(newItem, specificTextRegex)
        if (specificTextMatch?.length > 0) {
          newItem = newItem.replace(specificTextRegex, '').trim()
        }
        const specificPwMatch = getMatchesFromString(newItem, specificPwRegex)
        if (specificPwMatch?.length > 0) {
          newItem = newItem.replace(specificPwRegex, '').trim()
        }
        const linksArray = lodash.merge([], urlsMatch, emailsMatch)
        return (
          <div key={`${index}`}>
            {linksArray?.map((newUrl: string, newUrlIndex: number) => (
              <Link
                key={`${newUrl.trim()}-${index}-${newUrlIndex}`}
                href={newUrl.trim()}
                target='_blank'
                className='underline text-blue-600 hover:text-blue-800 visited:text-purple-600'
              >
                {newUrl.trim()}
              </Link>
            ))}
            {usernamePasswordMatch?.map((userPwStr: string, userPwIndex: number) => {
              const userPwArray = userPwStr.split('/')
              if (userPwArray.length !== 2) return null
              return (
                <TDSUsernamePassword
                  username={userPwArray[0].trim()}
                  pw={userPwArray[1].trim()}
                  key={`${userPwArray[0].trim()}-${index}-${userPwIndex}`}
                />
              )
            })}
            {specificTextMatch?.map((specificTextStr: string, specificTextIndex: number) => {
              const specificTextArray = specificTextStr.split(':')
              if (specificTextArray.length !== 2) return null
              return (
                <TDSPlainText
                  key={`${specificTextArray[0].trim()}-${index}-${specificTextIndex}`}
                  prefix={specificTextArray[0].trim()}
                  text={specificTextArray[1].trim()}
                />
              )
            })}
            {specificPwMatch?.map((specificPwStr: string, specificPwIndex: number) => {
              let specificPwArray: string[] = specificPwStr.split(':')
              if (!specificPwArray || specificPwArray[0].length === 0 || specificPwArray[0] === '') return null
              if (specificPwArray.length === 1) {
                specificPwArray = specificPwArray[0].split(' ')
                if (specificPwArray.length === 1) {
                  return (
                    <span className='text-sm' key={`${specificPwArray[0].trim()}-${index}-${specificPwIndex}`}>
                      {specificPwArray}
                    </span>
                  )
                }
                if (specificPwArray.length !== 2) return null
              }
              return (
                <TDSPassword
                  key={`${specificPwArray[0].trim()}-${index}-${specificPwIndex}`}
                  pw={specificPwArray[1].trim()}
                />
              )
            })}
            {newItem && <span>{newItem}</span>}
          </div>
        )
      })}
    </div>
  )
}

export const columns: ColumnDef<Clients>[] = [
  {
    accessorKey: 'clientName',
    minSize: 10,
    maxSize: 40,
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='m-0 p-2 w-25'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Client Name
          <ArrowDownUp className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => <div className='capitalize ml-2'>{row.getValue('clientName')}</div>,
  },
  {
    accessorKey: 'fieldName',
    minSize: 20,
    maxSize: 40,
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='m-0 p-2'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Field Name
          <ArrowDownUp className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => <div className='capitalize ml-2'>{row.getValue('fieldName')}</div>,
  },
  {
    accessorKey: 'fieldData',
    minSize: 100,
    maxSize: 100,
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='m-0 p-2'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Field Data
          <ArrowDownUp className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => {
      const fieldData = row.getValue('fieldData') as string

      // // Format the amount as a dollar amount
      // const formatted = new Intl.NumberFormat('en-US', {
      //   style: 'currency',
      //   currency: 'USD',
      // }).format(amount)

      return (
        <div className='ml-2'>
          <ClientFieldData fieldData={fieldData} />
        </div>
      )

      // return <div className=''>{fieldData}</div>
    },
  },
  {
    id: 'actions',
    header: () => <div className='text-right mr-2'>Actions</div>,
    minSize: 10,
    maxSize: 10,
    enableHiding: false,
    cell: ({ row }) => {
      const rowOriginal = row.original

      return (
        <div className='text-right mr-2'>
          <TooltipAcre text='Copy to Clipboard' delayDuration={100}>
            <Button
              className='h-8 ml-1'
              variant='ghost'
              size='icon'
              onClick={() => navigator.clipboard.writeText(rowOriginal.fieldData)}
            >
              <Copy className='h-4 w-4' />
              <span className='sr-only'>Copy to Clipboard</span>
            </Button>
          </TooltipAcre>
        </div>
      )
    },
  },
]

interface SmGridProps {
  clientOptions: ComboboxOptionType[]
  clientDetails: any
}

const SmGrid = ({ clientOptions, clientDetails = [] }: SmGridProps) => {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data: clientDetails,
    columns,
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
  const { replace } = useRouter()
  const searchParams = useSearchParams()
  const clientId = Number(searchParams.get('clientId'))
  const [loading, setLoading] = React.useState(false)
  const pathname = usePathname()

  const handleClientChange = (e: any) => {
    setLoading(true)
    const params = new URLSearchParams(searchParams)
    if (e?.id) {
      params.set('clientId', e?.id)
    } else {
      params.delete('clientId')
    }
    setInterval(() => {
      setLoading(false)
    }, 500)
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className='w-full'>
      <div className='flex space-between items-center py-4 gap-x-5'>
        <Combobox
          name='client'
          label='Clients'
          options={clientOptions}
          onChange={handleClientChange}
          defaultValue={clientOptions.find((client) => Number(client.id) === clientId)?.name}
        />
        {!!clientId && (
          <Input
            placeholder='Filter Secrets...'
            value={(table.getColumn('fieldData')?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn('fieldData')?.setFilterValue(event.target.value)}
            className='max-w-sm'
          />
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='ml-auto'>
              Columns <ChevronDown className='ml-2 h-4 w-4' />
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
      </div>
      <div className='rounded-md border'>
        <Table>
          {loading && <LoadingPage />}
          <TableHeader className='sticky w-full top-0 h-10 border-b-2 border-border rounded-t-md '>
            {table?.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      style={{
                        minWidth: header.column.columnDef.minSize || 10,
                        maxWidth: header.column.columnDef.maxSize || 20,
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
      <div className='flex items-center justify-end space-x-2 py-4'>
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

export { SmGrid }
