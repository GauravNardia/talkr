"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Home,
  Mic,
  Sparkles,
  Crown,
  LogIn,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { navItems } from "@/constants";

const sidebarVariants = {
  open: { width: 220, transition: { duration: 0.3 } },
  closed: { width: 65, transition: { duration: 0.3 } },
};


const LeftSidebar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleRedirect = (path: string) => {
    if (pathname !== path) {
      router.push(path);
    }
  };

  return (
    <motion.div
      className="h-screen bg-black border-r border-neutral-800 hidden md:flex flex-col p-4 text-white fixed z-20"
      animate={isHovered ? "open" : "closed"}
      variants={sidebarVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo */}
      <Link
        href="/app/home"
        className={`w-12 h-12 flex items-center justify-center font-bold text-lg mb-6 rounded-lg ${
          isHovered && "justify-start px-4 w-full"
        }`}
      >
        {isHovered ? (
          <div className="flex items-center gap-2">
            <Image src="/assets/icons/logo.svg" alt="logo" width={30} height={30} />
            <span className="text-white text-2xl font-semibold  font-dm-serif">Talkr</span>
          </div>
        ) : (
          <Image src="/assets/icons/logo.svg" alt="logo" width={30} height={30} />
        )}
      </Link>

      {/* Sections */}
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-1">
          {isHovered && <span className="text-xs text-gray-500 px-2 mb-1">Main</span>}
          {navItems.slice(0, 1).map((item) => (
            <Button
              key={item.path}
              variant="ghost"
              className={`flex items-center text-white text-sm font-medium justify-center w-10 h-10 hover:bg-green-500 hover:text-white cursor-pointer ${
                isHovered && "justify-start w-full px-4"
              } rounded-md transition ${
                pathname === item.path ? "bg-green-500" : "hover:bg-green-500"
              }`}
              onClick={() => handleRedirect(item.path)}
            >
              <item.icon size={20} />
              {isHovered && <span className="ml-2">{item.label}</span>}
            </Button>
          ))}
        </div>

        <div className="flex flex-col space-y-1">
          {isHovered && <span className="text-xs text-gray-500 px-2 mb-1">Practice</span>}
          {navItems.slice(1, 3).map((item) => (
            <Button
              key={item.path}
              variant="ghost"
              className={`flex items-center text-white text-sm font-medium justify-center w-10 h-10 hover:bg-green-500 hover:text-white cursor-pointer ${
                isHovered && "justify-start w-full px-4"
              } rounded-md transition ${
                pathname === item.path ? "bg-green-500" : "hover:bg-green-500"
              }`}
              onClick={() => handleRedirect(item.path)}
            >
              <item.icon size={20} />
              {isHovered && <span className="ml-2">{item.label}</span>}
            </Button>
          ))}
        </div>

        <div className="flex flex-col space-y-1">
          {isHovered && <span className="text-xs text-gray-500 px-2 mb-1">Rewards</span>}
          {navItems.slice(3, 4).map((item) => (
            <Button
              key={item.path}
              variant="ghost"
              className={`flex items-center text-white text-sm font-medium justify-center w-10 h-10 hover:bg-green-500 hover:text-white cursor-pointer ${
                isHovered && "justify-start w-full px-4"
              } rounded-md transition ${
                pathname === item.path ? "bg-green-500" : "hover:bg-green-500"
              }`}
              onClick={() => handleRedirect(item.path)}
            >
              <item.icon size={20} />
              {isHovered && <span className="ml-2">{item.label}</span>}
            </Button>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-auto pt-8">
        <nav className="flex flex-col justify-center items-center">
          <Button
            variant="ghost"
            className={`text-white text-xs w-10 h-10 ${
              isHovered && "w-full justify-start px-4"
            }`}
          >
            <LogIn size={18} />
            {isHovered && <span className="ml-2">User</span>}
          </Button>
        </nav>
      </div>
    </motion.div>
  );
};

export default LeftSidebar;
