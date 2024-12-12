'use client'

import ReactConfetti from 'react-confetti'
import { useConfettiStore } from 'src/hooks/use-confetti-store'

export const ConfettiProvider = () => {
  const confetti = useConfettiStore()
  if (!confetti.isOpen) return null

  return (
    <ReactConfetti
      className='pointer-events-none z-[100]'
      recycle={false}
      numberOfPieces={500}
      onConfettiComplete={() => confetti.onClose()}
    />
  )
}
