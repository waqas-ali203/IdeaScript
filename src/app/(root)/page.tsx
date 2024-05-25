'use client'

import Image from 'next/image'
import Header from '../../components/HeaderComponents/Header'
import Headings from './_components/Headings'
import Heros from './_components/Heros'
import Footer from './_components/Footer'
import { useEffect } from 'react'


export default function Home() {

  return (
   <>
   <div className='min-h-screen flex flex-col'>
      <Header />
    <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-6">
      <Headings />
      <Heros />
      
      
    </div>
    <Footer />
   </div>
   </>
  )
}
