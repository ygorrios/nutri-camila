'use client'

import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface PlaceHolderContentProps {
  children?: React.ReactNode
  header?: React.ReactNode
  pathBack?: string
  pathBackText?: string
}

const PlaceholderContent = ({ children, pathBack, pathBackText, header }: PlaceHolderContentProps) => {
  return (
    <div>
      {/* <div className='flex items-center gap-x-2 p-4'>
        {pathBack && (
          <div className='flex-col justify-center '>
            <TooltipAcre text='Voltar'>
              <Button className='h-8' variant='ghost' size='icon' onClick={() => router.push(pathBack)}>
                <ArrowLeft className='w-4 h-4' />
                <span className='sr-only'>Voltar</span>
              </Button>
            </TooltipAcre>
          </div>
        )}
        {header && <div className='w-full'>{header}</div>}
      </div> */}
      <div className='mt-2'>{header && <div className='w-full'>{header}</div>}</div>
      <div className='mt-3'>
        {pathBack && (
          <Link href={pathBack} className='flex items-center text-sm hover:opacity-75 transition mb-6'>
            <ArrowLeft className='h-4 w-4 mr-2' />
            {pathBackText || 'Voltar'}
          </Link>
        )}
      </div>
      <div className='mt-2'>
        <div className='flex flex-col w-full relative'>{children}</div>
      </div>
    </div>
  )
}
export default PlaceholderContent
