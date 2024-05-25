import HeaderLogo from '@/components/HeaderComponents/HeaderLogo'
import { Button } from '@/components/ui/button'
import React from 'react'

function Footer() {
  return (
    <div className='flex items-center w-full p-1 sm:p-6 bg-background z-50'>
        <span className='hidden md:flex items-center justify-center'><HeaderLogo /><span className='font-bold'> IdeaScript</span></span>
        <div className="md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2 text-muted-foreground">
            <Button variant='ghost' size={'sm'}>
                Privacy Policy
            </Button>
            <Button variant='ghost' size={'sm'}>
                Terms & Conditions
            </Button>
        </div>

    </div>
  )
}

export default Footer