import Image from 'next/image'
import React from 'react'

const Introducing = () => {
  return (
 <section className="w-full bg-neutral-950 border-b border-neutral-800 text-white py-20 px-4 text-center relative overflow-hidden">
    <div className="flex justify-center mb-4">
      <Image src="/assets/icons/waveform.svg" alt='wave-logo' width={55} height={55} />
    </div>

    <blockquote className="max-w-4xl mx-auto text-lg md:text-3xl font-archivo leading-relaxed text-gray-300">
      <p>
        Achieve real fluency by having{" "}
        <span className="font-dm-serif italic text-green-500">
        conversations with AI-powered tutors that guide you every step.
        </span>{" "}
        <span className="font-dm-serif italic text-green-500">
          standout from crowd
        </span>
        . <br />
        Talk. Learn. Master.{" "}
      </p>
    </blockquote>

    {/* Optional glow effect */}
    <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[60%] h-60 bg-gradient-to-r from-neutral-500 to-transparent rounded-full blur-3xl opacity-20" />
  </section>

  )
}

export default Introducing