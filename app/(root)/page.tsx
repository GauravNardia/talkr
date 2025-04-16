import { HeroSection } from '@/components/landingpage/HeroSection'
import Introducing from '@/components/landingpage/Introducing'
import { PricingSection } from '@/components/landingpage/PricingSection'
import React from 'react'



const Home = () => {
  return (
    <section className='w-full flex  flex-col justify-center items-center'>
        <HeroSection/>
        <Introducing/>
        <PricingSection/>
        {/* <FeatureSection/>
        <PricingSection/>
        <TestimonialsSection/> */}
    </section>
  )
}

export default Home