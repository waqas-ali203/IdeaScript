import { Spinner } from '@/components/spinner'
import { Button } from '@/components/ui/button'
import { SignInButton } from '@clerk/clerk-react'
import { useConvexAuth } from 'convex/react'
import Link from 'next/link'
import React from 'react'
import {AiOutlineArrowRight} from 'react-icons/ai'

function Headings() {
  const { isAuthenticated,isLoading} = useConvexAuth()
  return (
    <div className='max-w-3xl space-y-4 mt-10'>
        <h1 className='text-3xl sm:text-5xl md:text-6xl font-bold'>
            Your Ideas, Documents, & Plans. Unified. Welcom to <span className='underline'>IdeaScript</span>
        </h1>
        <h3 className='text-base sm:text-xl md:text-2xl font-medium'>
            IdeaScript is the connected workespace where <br /> better, faster work happens.
        </h3>

{
isAuthenticated && !isLoading && (
    <Button variant={'default'} asChild>
        <Link href={'/documents'}>
        Enter IdeaScript 
        <span className='ms-2 mt-1'>
        <AiOutlineArrowRight size="20px" />
        </span>
        </Link>
        </Button>
)}
{!isAuthenticated&&!isLoading && (
  <SignInButton mode='modal'>
    <Button>Get IdeaScript
        <span className='ms-2 mt-1'>
        <AiOutlineArrowRight size="20px" />
        </span>
    </Button>
  </SignInButton>
)}
{
  isLoading&&(<div className='flex justify-center'><Spinner size={'large'} /></div>)
}

    </div>
  )
}

export default Headings