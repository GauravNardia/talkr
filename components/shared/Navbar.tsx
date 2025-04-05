import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { ChevronRight, AlignJustify } from 'lucide-react';
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
      <div className="w-full flex justify-between items-center px-40 py-6 bg-white rounded-2xl">
        <Link href="/" className="text-3xl font-semibold text-black">Talkr</Link>

        <div className="flex text-md gap-3 space-x-6 text-neutral-500 font-regular">
          <Link href="/features" className="hover:text-gray-900 transition">Features</Link>
          <Link href="/benefits" className="hover:text-gray-900 transition">Benefits</Link>
          <Link href="/pricing" className="hover:text-gray-900 transition">Pricing</Link>
          <Link href="/contact" className="hover:text-gray-900 transition">Contact</Link>
        </div>

        <Button variant="outline" className="p-5 py-6 cursor-pointer text-neutral-500 rounded-full font-regular text-md transition">
          Get Started<ChevronRight/>
        </Button>
      </div>
    </nav>

    <div className="w-full flex items-center justify-between px-6 py-3 md:hidden">
        <Link href="/" className="text-3xl font-semibold text-gray-800">Talkr</Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost">
              <AlignJustify className="text-neutral-600 w-20 h-20" />
            </Button>
          </SheetTrigger>
          <SheetContent side="top" className="text-black border-none">
            <SheetHeader>
              <SheetTitle>
                <SheetClose asChild>
                  <Link href="/" className="text-xl font-regular text-black">
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
