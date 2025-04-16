import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { ChevronRight, AlignJustify, Sparkle } from 'lucide-react';
import Image from 'next/image';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet";

const Navbar = () => {
  return (
    <>
    <nav className="hidden md:block">
      <div className="w-full flex justify-between items-center px-20 py-2 bg-neutral-950 border-b border-neutral-800">
      <Link href="/" className="text-3xl flex justify-center items-center gap-2 font-semibold text-white font-dm-serif">
        <Image src="/assets/icons/logo.svg" alt='logo' width={32} height={32} />
        Talkr
        </Link>
        <div className="flex text-md text-white gap-3 space-x-6  border border-neutral-800 font-regular px-6 py-2 rounded-full">
          <Link href="/features" className="hover:text-gray-500 transition">Features</Link>
          <Link href="/benefits" className="hover:text-gray-500 transition">Benefits</Link>
          <Link href="/pricing" className="hover:text-gray-500 transition">Pricing</Link>
          <Link href="/contact" className="hover:text-gray-500 transition">Contact</Link>
        </div>

        <Button variant="outline" className="px-5 cursor-pointer text-white bg-neutral-900 shadow-2xl shadow-white shadow-inner border-neutral-800 rounded-lg font-regular text-md hover:bg-neutral-800 hover:text-white transition">
          <Sparkle/>Get Started
        </Button>
      </div>
    </nav>

    <div className="w-full flex items-center justify-between px-6 py-3 md:hidden">
        <Link href="/" className="text-3xl flex justify-center items-center gap-2 font-semibold text-white font-dm-serif">
        <Image src="/assets/icons/logo.svg" alt='logo' width={32} height={32} />
        Talkr
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className='hover:bg-neutral-800'>
              <AlignJustify className="text-white  w-20 h-20" />
            </Button>
          </SheetTrigger>
          <SheetContent side="top" className="text-white bg-neutral-900 border-none">
            <SheetHeader>
              <SheetTitle>
                <SheetClose asChild>
                <Link href="/" className="text-3xl flex justify-start items-center gap-2 font-semibold text-white font-dm-serif">
                 <Image src="/assets/icons/logo.svg" alt='logo' width={32} height={32} />
                 Talkr
                </Link>
                </SheetClose>
              </SheetTitle>
            </SheetHeader>
            <div className="grid gap-4 py-6 text-md font-regular px-5">
              <SheetClose asChild>
                <Link href="features" className="hover:text-gray-900 transition">
                  Features
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/benefits" className="hover:text-gray-900 transition">
                  Benefits
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/pricing" className="hover:text-gray-900 transition">
                  Pricing
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/contact" className="hover:text-gray-900 transition">
                  Contact
                </Link>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    
    </>
  );
};

export default Navbar;