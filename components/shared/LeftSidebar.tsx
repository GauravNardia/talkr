"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Home,
  Mic,
  Sparkles,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const sidebarVariants = {
  open: { width: 220, transition: { duration: 0.3 } },
  closed: { width: 65, transition: { duration: 0.3 } },
};

const AnimatedSidebar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [activeTab, setActiveTab] = useState("/"); // Default Home
  const router = useRouter();

  const handleRedirect = (path: string) => {
    setActiveTab(path);
    router.push(path);
  };

  return (
    <motion.div
      className="h-screen bg-white hidden md:flex flex-col p-4 border-r fixed"
      animate={isHovered ? "open" : "closed"}
      variants={sidebarVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo */}
      <Link href="/app/home" className={`w-10 h-10 flex items-center justify-center font-bold text-lg mb-6 shadow-sm rounded-lg ${isHovered && "justify-start px-5 w-full shadow-none"}`}>
        <div className="flex justify-center items-center">{isHovered ? "Talkr" : "T"}</div>
      </Link>

      {/* Navigation */}
      <nav className="flex flex-col justify-center items-center space-y-1">
        <Button
          variant="ghost"
          className={`flex items-center justify-center font-regular w-10 h-10 cursor-pointer ${isHovered && "justify-start w-full"} rounded-md transition ${
            activeTab === "/" ? "bg-neutral-100" : "hover:bg-gray-100"
          }`}
          onClick={() => handleRedirect("/app/home")}
        >
          <Home size={20} className="text-black" />
          {isHovered && <span>Home</span>}
        </Button>
        
      </nav>

      {/* Sections */}
      {isHovered && <div className="text-xs font-semibold text-gray-500 mt-12 mb-3">Playground</div>}
      <nav className={`flex flex-col justify-center items-center space-y-1 ${ isHovered || !isHovered && "mt-12"}`}>
        <Button
          variant="ghost"
          className={`flex text-sm font-regular items-center justify-center w-10 h-10 cursor-pointer ${isHovered && "justify-start w-full"} rounded-md transition ${
            activeTab === "/text-to-speech" ? "bg-neutral-100" : "hover:bg-gray-100"
          }`}
          onClick={() => handleRedirect("/text-to-speech")}
        >
          <Mic size={20} className="text-black"  />
          {isHovered && <span>Text to Speech</span>}
        </Button>
        <Button
          variant="ghost"
          className={`flex items-center justify-center w-10 h-10 cursor-pointer ${isHovered && "justify-start w-full"} rounded-md transition ${
            activeTab === "/voice-changer" ? "bg-neutral-100" : "hover:bg-gray-100"
          }`}
          onClick={() => handleRedirect("/voice-changer")}
        >
          <Sparkles size={20} className="text-black"  />
          {isHovered && <span>Voice Changer</span>}
        </Button>
      </nav>

      {/* Products */}
      {isHovered && <div className="text-xs font-semibold text-gray-500 mt-12 mb-3">Products</div>}
      <nav className={`flex flex-col justify-center items-center space-y-1 ${ isHovered || !isHovered && "mt-12"}`}>
        <Button
          variant="ghost"
          className={`flex items-center justify-center w-10 h-10 cursor-pointer ${isHovered && "justify-start w-full"} rounded-md transition ${
            activeTab === "/studio" ? "bg-neutral-100" : "hover:bg-gray-100"
          }`}
          onClick={() => handleRedirect("/studio")}
        >
          <FileText size={20} className="text-black"  />
          {isHovered && <span>Studio</span>}
        </Button>
      </nav>
    </motion.div>
  );
};

export default AnimatedSidebar;
