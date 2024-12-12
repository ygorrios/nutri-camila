'use client'

import { Search } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'
import { useEffect, useState } from 'react'
import { useDebounce } from 'src/hooks/use-debounce'
import { Input } from './ui/input'

export const SearchInput = () => {
  const [value, setValue] = useState('')
  const debouncedValue = useDebounce(value)
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const currentCategory = searchParams?.get('categoryId')

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          title: debouncedValue,
          categoryId: currentCategory,
        },
      },
      { skipNull: true, skipEmptyString: true },
    )
    router.push(url)
  }, [router, debouncedValue, currentCategory, pathname])

  return (
    <div className='relative'>
      <Search className='h-4 w-4 absolute top-3 left-3 text-slate-600' />
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder='Pesquisar por um curso'
        className='w-full pl-9'
      />
    </div>
  )
}
