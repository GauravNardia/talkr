import React from 'react'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react';
import { ConvAI } from '@/components/conversation';
import Link from 'next/link';


const Home = () => {
  return (
    <section className='w-full flex  flex-col justify-center items-center mt-5'>
       Home
       <Link href="/app/home">Click here</Link>
    </section>
  )
}

export default Home