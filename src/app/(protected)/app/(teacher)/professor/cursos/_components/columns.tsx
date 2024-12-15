'use client'

import { Course } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal, Pencil } from 'lucide-react'
import Link from 'next/link'
import { Badge } from 'src/components/ui/badge'
import { Button } from 'src/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'src/components/ui/dropdown-menu'
import { cn } from 'src/lib/utils'
import CoursesActions from './columns-actions'

export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc')
          }}
        >
          Título
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
  },
  {
    accessorKey: 'price',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Preco
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
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
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Publicado
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell({ row }) {
      const isPublished = row.getValue('isPublished') || false
      return <Badge className={cn(!isPublished && 'bg-slate-500')}>{isPublished ? 'Publicado' : 'Rascunho'}</Badge>
    },
  },
  {
    id: 'actions',
    cell({ row }) {
      const { id, isPublished } = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-4 w-8 p-0'>
              <span className='sr-only'>Abrir menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <Link href={`/app/professor/cursos/${id}`}>
              <DropdownMenuItem>
                <Pencil className='mr-2 h-4 w-4' />
                Editar
              </DropdownMenuItem>
            </Link>
            <CoursesActions courseId={id} isPublished={isPublished} />
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
