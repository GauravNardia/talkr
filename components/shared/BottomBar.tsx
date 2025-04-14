"use client"
import { navItems } from '@/constants'
import React from 'react'
import { Button } from '../ui/button'
import { redirect, usePathname } from 'next/navigation';
import { LogIn, Settings } from 'lucide-react';

const BottomBar = () => {
      const pathname = usePathname();
    
  return (
    <section>
     <div className="fixed bottom-0 w-full bg-neutral-950 border-t border-neutral-800 flex justify-around items-center py-3 md:hidden z-20">
      {navItems.map((item) => (
       <Button
        key={item.path}
        variant="ghost"
        className={`w-12 h-12 flex justify-center items-center text-white hover:bg-green-500 hover:text-white cursor-pointer ${
        pathname === item.path ? "bg-green-500" : "hover:bg-green-500"
        } rounded-md`}
         onClick={() => redirect(item.path)}
       >
         <item.icon size={25} />
       </Button>
  ))}
  <Button
    variant="ghost"
    className="w-10 h-10 flex justify-center items-center text-white hover:bg-green-600/60 rounded-md"
  >
    <Settings size={18} />
  </Button>
</div>

    </section>
  )
}

export default BottomBar