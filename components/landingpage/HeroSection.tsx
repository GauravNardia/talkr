"use client"
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.7;
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 12 
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { scale: 0.95 }
  };


  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden ">
      {/* Video Background with Parallax Effect */}
      <div className="absolute select-none inset-0 w-full h-full overflow-hidden z-0">
        <motion.div 
          className="absolute inset-0 bg-black/70 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        />
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute grayscale w-full h-full object-cover scale-105"
        >
          <source src="/assets/videos/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Content Overlay with Advanced Animations */}
      <motion.div 
        className="relative z-20 mt-20 mx-auto px-4 md:px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-3xl mx-auto">
        <div className="text-3xl flex justify-center items-center gap-2 font-semibold text-white font-dm-serif">
           <Image src="/assets/icons/logo.svg" alt='logo' width={65} height={65} />
          </div>
          <motion.div 
            className="inline-block px-3 py-1 mb-6 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
         <div className="flex gap-3 judtify-center items-center mt-5">
         <span className="relative flex h-3 w-3">
           <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
           <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
        <span className="font-dm-serif">
          Talkr
        </span>
         </div>
          </motion.div>
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-5xl font-bold mb-6 leading-tight"
            variants={itemVariants}
          >
            <span className="bg-clip-text font-semibold text-center bg-gradient-to-r from-white to-gray-300">
            What If Learning a Language Was as Easy as<span className="text-green-500 font-dm-serif italic"> Talking?</span>
            </span>
          </motion.h1>
          <motion.p 
            className="text-md md:text-lg mb-8 text-gray-300 max-w-2xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
           AI listens, corrects, and helps you improve instantly.          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            variants={itemVariants}
          >
            <motion.div
              variants={buttonVariants}
              className="relative"
            >
            <Link href="/sign-in" className="">
            <Button className="h-12 px-6 cursor-pointer text-base relative z-10 bg-black border border-neutral-800">
                Get Started
                <div>
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </div>
              </Button>
            </Link>
            </motion.div>
          </motion.div>
          <motion.div 
            className="flex items-center justify-center space-x-4"
            variants={itemVariants}
          >
            <motion.div 
              className="flex -space-x-3"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              {[0, 1, 2, 3].map((i) => (
                <motion.div 
                  key={i}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                    i === 0 ? "bg-gray-300 text-gray-800" :
                    i === 1 ? "bg-gray-400 text-gray-800" :
                    i === 2 ? "bg-gray-500 text-white" : "bg-gray-600 text-white"
                  }`}
                  initial={{ x: -5, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.2 + i * 0.1 }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                >
                  {i < 3 ? ["JP", "KL", "MN"][i] : "+5"}
                </motion.div>
              ))}
            </motion.div>
            <motion.p 
              className="text-sm text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
            >
              <motion.span 
                className="font-semibold"
                animate={{ 
                  color: ["#4ade80", "#ffffff", "#4ade80"], 
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                1,000+
              </motion.span> users already onboard
            </motion.p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};