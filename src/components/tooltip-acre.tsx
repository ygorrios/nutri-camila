import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'

const TooltipAcre = ({ children, text, delayDuration }: any) => {
  return (
    <TooltipProvider disableHoverableContent>
      <Tooltip delayDuration={delayDuration || 100}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side='bottom'>{text}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export { TooltipAcre }
