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
          <TooltipAcre text='Back'>
            <Button className='h-8' variant='ghost' size='icon' onClick={() => router.push(pathBack)}>
              <ArrowLeft className='w-4 h-4' />
              <span className='sr-only'>Back</span>
            </Button>
          </TooltipAcre>
        </div>
      )}
      {/* <Card className={cn('rounded-lg border-none', pathBack ? 'mt-2' : 'mt-6')}>
        <CardContent className='p-6'> */}
      <div className='mt-6'>
        <div className='flex flex-col w-full relative'>{children}</div>
      </div>
      {/* </CardContent>
      </Card> */}
    </div>
  )
}
export default PlaceholderContent
