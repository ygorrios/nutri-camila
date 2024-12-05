import { SignInButton } from '@clerk/nextjs'
import Image from 'next/image'
import BgSrc from 'src/assets/images/camila_bg_small.png'
import { Logo } from 'src/components/logo'
import { Button } from 'src/components/ui/button'

const HomePage = () => {
  // const searchParams = useSearchParams()
  // const error = searchParams.get('error')
  // useEffect(() => {
  //   if (error) {
  //     let timeout: ReturnType<typeof setTimeout> | undefined
  //     let errorMessage: string | undefined = error
  //     if (error === 'AccessDenied') {
  //       errorMessage = 'Please login with TDS/Acre account'
  //     }
  //     timeout = setTimeout(() => {
  //       toast({
  //         title: 'Error',
  //         description: errorMessage,
  //         variant: 'destructive',
  //       })
  //     }, 0)
  //     return () => clearTimeout(timeout)
  //   }
  // }, [])

  return (
    <div className='flex min-h-full'>
      <div className='flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 xl:flex-none lg:px-24 xl:px-36 bg-slate-50'>
        <div className='mx-auto w-full max-w-sm lg:w-96'>
          <div>
            <div className='sm:mx-auto sm:w-full sm:max-w-md flex flex-col'>
              <div className='flex justify-center'>
                <Logo className='w-auto' smallLogo width={1024} />
              </div>
            </div>

            <div className='sm:mx-auto sm:w-full sm:max-w-md flex justify-center'>
              <div className='px-4 py-6 sm:rounded-lg sm:px-20'>
                <SignInButton>
                  <Button size='lg'>Entrar</Button>
                </SignInButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='relative hidden flex-1 xl:block'>
        <Image src={BgSrc} alt='background-image' className='absolute bottom-0 right-0 opacity-60 object-cover' />
      </div>
    </div>
  )
}

export default HomePage
