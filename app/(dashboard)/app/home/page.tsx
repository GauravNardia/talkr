import React from 'react'
import { Dashboard } from '@/components/shared/Dashboard'
import Link from 'next/link'

const HomeDashboard = () => {
  return (
    <section className='flex flex-col justify-center items-center'>
       <Dashboard/>
    </section>
  )
}

export default HomeDashboard