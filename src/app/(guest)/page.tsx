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
    <div className='relative h-full'>
      <div className='relative h-80 overflow-hidden hidden md:block md:absolute md:left-0 md:h-full md:w-1/3 lg:w-2/3'>
        <Image src={BgSrc} alt='background-image' className='opacity-60 size-full object-cover' />
        {/* <img
        alt=""
        src="https://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=60&blend=6366F1&sat=-100&blend-mode=multiply"
        className="size-full object-cover"
      />
      <svg
        viewBox="0 0 926 676"
        aria-hidden="true"
        className="absolute -bottom-24 left-24 w-[57.875rem] transform-gpu blur-[118px]"
      >
        <path
          d="m254.325 516.708-90.89 158.331L0 436.427l254.325 80.281 163.691-285.15c1.048 131.759 36.144 345.144 168.149 144.613C751.171 125.508 707.17-93.823 826.603 41.15c95.546 107.978 104.766 294.048 97.432 373.585L685.481 297.694l16.974 360.474-448.13-141.46Z"
          fill="url(#60c3c621-93e0-4a09-a0e6-4c228a0116d8)"
          fillOpacity=".4"
        />
        <defs>
          <linearGradient
            id="60c3c621-93e0-4a09-a0e6-4c228a0116d8"
            x1="926.392"
            x2="-109.635"
            y1=".176"
            y2="321.024"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#776FFF" />
            <stop offset={1} stopColor="#FF4694" />
          </linearGradient>
        </defs>
      </svg> */}
      </div>
      <div className='h-full flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 xl:flex-none lg:px-24 xl:px-36 bg-slate-50'>
        <div className='pl-6 pr-6 md:ml-auto md:w-2/3 md:pl-16 lg:w-1/3 lg:pl-24 lg:pr-0 xl:pl-40 '>
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
          {/* <h2 className='text-base/7 font-semibold text-indigo-400'>Award winning support</h2>
          <p className='mt-2 text-4xl font-semibold tracking-tight text-white sm:text-5xl'>We’re here to help</p>
          <p className='mt-6 text-base/7 text-gray-300'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et, egestas tempus tellus etiam sed. Quam a
            scelerisque amet ullamcorper eu enim et fermentum, augue. Aliquet amet volutpat quisque ut interdum
            tincidunt duis.
          </p>
          <div className='mt-8'>
            <a
              href='#'
              className='inline-flex rounded-md bg-white/10 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
            >
              Visit the help center
            </a>
          </div> */}
        </div>
      </div>
    </div>
    // <div className='flex min-h-full'>
    //   <div className='flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 xl:flex-none lg:px-24 xl:px-36 bg-slate-50'>
    //     <div className='mx-auto w-full max-w-sm lg:w-96'>
    //       <div>
    //         <div className='sm:mx-auto sm:w-full sm:max-w-md flex flex-col'>
    //           <div className='flex justify-center'>
    //             <Logo className='w-auto' smallLogo width={1024} />
    //           </div>
    //         </div>

    //         <div className='sm:mx-auto sm:w-full sm:max-w-md flex justify-center'>
    //           <div className='px-4 py-6 sm:rounded-lg sm:px-20'>
    //             <SignInButton>
    //               <Button size='lg'>Entrar</Button>
    //             </SignInButton>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <div className='relative hidden flex-1 xl:block'>
    //     <Image src={BgSrc} alt='background-image' className='absolute bottom-0 right-0 opacity-60 object-cover' />
    //   </div>
    // </div>
  )
}

export default HomePage
