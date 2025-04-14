import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

const TopBar = () => {
  return (
    <section>
        <div className="w-full bg-neutral-950 border-b border-neutral-800 px-4 py-3 flex items-center justify-between md:hidden fixed top-0 z-30">
      <Link href="/app/home" className="flex items-center gap-2">
        <Image src="/assets/icons/logo.svg" alt="logo" width={35} height={35} />
        <span className="text-white text-2xl font-semibold font-dm-serif">Talkr</span>
      </Link>
    

      <Button variant="ghost" className="rounded-full p-0 h-10 w-10 overflow-hidden">
        <Image
          src="/assets/images/avatar.png"
          alt="avatar"
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
      </Button>
    </div>
    </section>
 
  )
}

export default TopBar