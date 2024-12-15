'use client'

import { useRouter } from 'next/navigation'

import { PlusIcon } from 'lucide-react'
import Link from 'next/link'
import { useCallback, useMemo, useState } from 'react'
import DataTable from 'src/components/data-table/data-table'
import { DebouncedInput } from 'src/components/debounce-input'
import { Button } from 'src/components/ui/button'
import axiosApi from 'src/services/api'
import { getCategoryColumns } from './category-columns'
export type Clients = {
  clientName: string
  fieldName: string
  fieldData: string
}

interface CategoryGridProps {
  dataGrid: any
}

const CategoryGrid = ({ dataGrid = [] }: CategoryGridProps) => {
  const [globalFilter, setGlobalFilter] = useState('')
  const [loading, setLoading] = useState(false)
  const { refresh } = useRouter()

  const onDelete = useCallback(async (id: string) => {
    try {
      setLoading(true)
      await axiosApi.delete(`/api/categorias/${id}`)
      refresh()
      setInterval(() => {
        setLoading(false)
      }, 800)
    } catch (error) {
      setLoading(false)
      console.log('[DELETE_CATEGORY]', error)
    }
  }, [])

  const columnsDt = useMemo(() => getCategoryColumns({ onDelete }), [])

  return (
    <div className='w-full'>
      <div className='flex space-between items-center py-4 gap-x-5'>
        <DebouncedInput
          placeholder='Pesquisar Categorias...'
          value={globalFilter ?? ''}
          onChange={(value) => setGlobalFilter(String(value))}
          className='max-w-sm'
        />
        <Link href='/app/professor/categorias/criar' className='ml-auto'>
          <Button>
            <span className='sr-only'>Add</span>
            <PlusIcon className='w-4 h-4' />
            Add
          </Button>
        </Link>
      </div>
      <DataTable
        columns={columnsDt}
        data={dataGrid}
        isLoading={loading}
        setGlobalFilter={setGlobalFilter}
        globalFilter={globalFilter}
      />
    </div>
  )
}

export { CategoryGrid }
