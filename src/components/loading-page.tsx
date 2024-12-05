'use client'

import { useEffect, useState } from 'react'
import { cn } from 'src/lib/utils'
import { Progress } from './ui/progress'

const LoadingPage = ({ className, isBottomBar }: { className?: string; isBottomBar?: boolean }) => {
  const [progress, setProgress] = useState(1)
  // const { status } = useSession() as any

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval)
          return 100
        }
        return prevProgress + 5
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className='flex flex-col h-full'>
      <div className={cn('absolute  left-0 right-0 z-10 flex', className, isBottomBar ? 'bottom-0' : 'top-0')}>
        <Progress value={progress} className='h-1' />
      </div>
    </div>
  )
}

export { LoadingPage }
