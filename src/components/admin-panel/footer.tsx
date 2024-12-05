const Footer = () => {
  return (
    <div className='z-20 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='mx-4 md:mx-8 flex h-14 justify-end items-center'>
        <p className='text-xs md:text-sm leading-loose text-muted-foreground text-right'>
          Copyright © 2024 Ygor Siqueira. All rights reserved.
        </p>
      </div>
    </div>
  )
}

export { Footer }
