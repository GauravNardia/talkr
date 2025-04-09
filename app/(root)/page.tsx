import React from 'react'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react';
import { ConvAI } from '@/components/conversation';
import Link from 'next/link';
import { HeroSection } from '@/components/shared/HeroSection';
import { PricingSection } from '@/components/shared/PricingSection';
import { TestimonialsSection } from '@/components/shared/TestimonialsSection';
import FeatureSection from '@/components/shared/FeatureSection';
import Introducing from '@/components/shared/Introducing';


const Home = () => {
  return (
    <section className='w-full flex  flex-col justify-center items-center mt-5'>
        <HeroSection/>
        <Introducing/>
        <FeatureSection/>
        <PricingSection/>
        <TestimonialsSection/>
    </section>
  )
}

export default Home