import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { Session } from 'next-auth'
import { Avatar } from '../ui/avatar'
import { getInitials } from '@/lib/utils'

const TopBar = ({session}: {session: Session}) => {

  return (
    <section>
        <div className="w-full bg-neutral-950 border-b border-neutral-800 px-4 py-3 flex items-center justify-between md:hidden fixed top-0 z-30">
      <Link href="/app/home" className="flex items-center gap-2">
        <Image src="/assets/icons/logo.svg" alt="logo" width={35} height={35} />
        <span className="text-white text-2xl font-semibold font-dm-serif">Talkr</span>
      </Link>
    

      <Avatar className='bg-neutral-900 p-5 text-white text-center flex justify-center items-center'>
      {getInitials(session.user?.name!)}
    </Avatar>
    </div>
    </section>
 
  )
}

export default TopBar