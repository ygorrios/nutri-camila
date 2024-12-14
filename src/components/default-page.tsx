'use client'

import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { TooltipAcre } from './tooltip-acre'
import { Button } from './ui/button'

interface PlaceHolderContentProps {
  children?: React.ReactNode
  pathBack?: string
}

const PlaceholderContent = ({ children, pathBack }: PlaceHolderContentProps) => {
  const router = useRouter()
  return (
    <div>
      {pathBack && (
        <div className='flex-col justify-center pt-2'>
          <TooltipAcre text='Voltar'>
            <Button className='h-8' variant='ghost' size='icon' onClick={() => router.push(pathBack)}>
              <ArrowLeft className='w-4 h-4' />
              <span className='sr-only'>Voltar</span>
            </Button>
          </TooltipAcre>
        </div>
      )}
      <div className='mt-6'>
        <div className='flex flex-col w-full relative'>{children}</div>
      </div>
    </div>
  )
}
export default PlaceholderContent
