import { Progress } from 'src/components/ui/progress'
import { cn } from 'src/lib/utils'

interface CourseProgressProps {
  value: number
  variant?: 'default' | 'success'
  size?: 'default' | 'sm'
}

const colorByVariant = {
  default: 'text-sky-700',
  success: 'text-emerald-700',
}

const sizeByVariant = {
  default: 'text-sm',
  sm: 'text-xs',
}

export const CourseProgress = ({ value, variant, size }: CourseProgressProps) => {
  return (
    <div>
      <Progress className='h-2' value={value} />
      <p className={cn('font-medium mt-2', colorByVariant[variant || 'default'], sizeByVariant[size || 'default'])}>
        {Math.round(value)}% Completo
      </p>
    </div>
  )
}
