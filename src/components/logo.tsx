'use client'

import Image from 'next/image'
import SmallLogoSrc from 'src/assets/images/logo.png'
import LogoSrc from 'src/assets/images/logo_camila.png'

type ILogoProps = {
  className?: string
  alt?: string
  width?: number
  smallLogo?: boolean
}

const Logo = ({ className, alt, width, smallLogo }: ILogoProps) => {
  return (
    <Image
      src={smallLogo ? LogoSrc : SmallLogoSrc}
      width={width || 130}
      alt={alt || 'Logo'}
      className={className}
      loading='lazy'
    />
  )
}

export { Logo }
