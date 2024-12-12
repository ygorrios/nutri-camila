'use client'
import { LucideIcon } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'
import { cn } from 'src/lib/utils'

export interface ICategoryItemProps {
  label?: string
  value?: string
  icon?: LucideIcon
}

export default function CategoryItem({ label, icon: Icon, value }: ICategoryItemProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const currentCategory = searchParams?.get('categoryId')
  const currentTitle = searchParams?.get('title')

  const isSelected = currentCategory === value

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          title: currentTitle,
          categoryId: isSelected ? null : value,
        },
      },
      { skipNull: true, skipEmptyString: true },
    )
    router.push(url)
  }

  return (
    <button
      onClick={onClick}
      type='button'
      className={cn(
        'py-2 px-3 text-sm border border-slate-200 rounded-full flex items-center gap-x-1 hover:border-sky-700 transition',
        isSelected && 'border-sky-700 bg-sky-200/20 text-sky-800',
      )}
    >
      {Icon && <Icon size={16} />}
      <div className='truncate'>{label}</div>
    </button>
  )
}
