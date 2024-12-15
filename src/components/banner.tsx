import { VariantProps, cva } from 'class-variance-authority'
import { AlertTriangle, CheckCircleIcon } from 'lucide-react'
import { cn } from 'src/lib/utils'

const bannerVariants = cva('border rounded-md p-4 text-sm flex items-center w-full', {
  variants: {
    variant: {
      warning: 'bg-yellow-100/80 border-yellow-30 text-black',
      success: 'bg-emerald-700 border-emerald-800 text-secondary',
    },
  },
  defaultVariants: {
    variant: 'warning',
  },
})

const iconMap = {
  warning: AlertTriangle,
  success: CheckCircleIcon,
}

export interface IBannerProps extends VariantProps<typeof bannerVariants> {
  label: string
}

export function Banner({ label, variant }: IBannerProps) {
  const Icon = iconMap[variant || 'warning']
  return (
    <div className={cn(bannerVariants({ variant }))}>
      <Icon className='w-4 h-4 mr-2' />
      <span>{label}</span>
    </div>
  )
}
