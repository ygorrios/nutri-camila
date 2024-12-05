'use client'

import { Check, ChevronsUpDown, X } from 'lucide-react'
import * as React from 'react'
import { Button } from 'src/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from 'src/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from 'src/components/ui/popover'
import { cn } from 'src/lib/utils'
import { useDebouncedCallback } from 'use-debounce'
import { TooltipAcre } from './tooltip-acre'

interface ComboboxProps {
  options: ComboboxOptionType[]
  label: string
  name: string
  onChange: (option: ComboboxOptionType[] | string, dataValue: string | undefined) => void
  disabled?: boolean
  defaultValue?: string
  className?: string
  mainClassName?: string
  listClassName?: string
  dataValue?: string
  hideClear?: boolean
}

export function Combobox({
  options,
  label,
  name,
  onChange,
  dataValue,
  disabled,
  defaultValue,
  mainClassName,
  listClassName,
  className,
  hideClear,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(defaultValue || '')

  const handleOnSearchChange = useDebouncedCallback((currentValue: string, option: any) => {
    if (currentValue === '') {
      return
    }

    setValue(option.name)
    setOpen(false)
    if (onChange) {
      onChange(option, dataValue)
    }
  }, 300)

  const resetField = () => {
    setValue('')
    setOpen(false)
    if (onChange) {
      onChange('', dataValue)
    }
  }

  return (
    <div className='flex flex-row'>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            role='combobox'
            aria-expanded={open}
            className={cn('justify-between', mainClassName || '')}
          >
            {value ? options?.find((option) => option.name == value)?.name : `Select ${label}...`}
            <ChevronsUpDown className='opacity-50 ml-2 w-4 h-4 shrink-0' />
          </Button>
        </PopoverTrigger>
        {value && !hideClear && (
          <TooltipAcre text={`Reset ${label}`}>
            <Button variant='ghost' className='flex items-center px-1 ml-2' onClick={resetField}>
              <X className='w-4 h-4' />
              <span className='sr-only'>{`Reset ${label}`}</span>
            </Button>
          </TooltipAcre>
        )}
        <PopoverContent className={cn('p-0', listClassName || '')} align='start'>
          <Command>
            <CommandInput placeholder={`Search ${label}...`} />
            <CommandList>
              <CommandEmpty>{`No ${label} found`}</CommandEmpty>
              <CommandGroup>
                {options?.map((option) => (
                  <CommandItem
                    key={option.id}
                    value={option.name}
                    onSelect={(currentValue) => handleOnSearchChange(currentValue, option)}
                  >
                    <Check className={cn('mr-2 h-4 w-4', value === option.name ? 'opacity-100' : 'opacity-0')} />
                    {option.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
