'use client'


import Lottie from 'lottie-react'
import React from 'react'
import * as errorLight from '../../public/assets/error-light.json'
import * as errorDark from '../../public/assets/error-dark.json'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function Error() {

    const {resolvedTheme} = useTheme()
    const router = useRouter()
    const handleRedirect = ()=>{
            router.push('/');
    }

  return (
    <div className='z- relative'>
        {resolvedTheme==='dark'?(
            <Lottie className=' h-[100vh] ' animationData={errorDark} />
            ):(
                <Lottie className=' h-[100vh]' animationData={errorLight} />
        )}
        <Button variant={'ghost'} className='absolute top-10  hover:bg-muted-foreground hover:text-white cursor-pointer ml-2' onClick={handleRedirect}  >Go to Home!</Button>
</div>
  )
}
