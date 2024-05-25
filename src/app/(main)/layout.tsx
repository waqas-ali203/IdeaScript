'use client'
import { Spinner } from '@/components/spinner'
import { useConvexAuth } from 'convex/react'
import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'
import Navigation from './_components/navigation'
import SearchCommand from '@/components/search-command'

export default function MainLayout({children}:{children:ReactNode}) {
const {isAuthenticated,isLoading} = useConvexAuth()

if(isLoading){
    return(<div className='h-screen flex items-center justify-center'><Spinner size={'large'} /></div>)
}
if(!isAuthenticated){
    return redirect('/')
}
  return (
    <div className='h-screen flex dark:bg-[#1f1f1f]'>
        <Navigation />
        <main className='flex-1 h-full overflow-y-auto'>
          <SearchCommand />
        {children}
        </main>
    </div>
  )
}
