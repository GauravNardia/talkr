// components/FeatureSection.tsx
'use client'

import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'

const features = [
  {
    title: 'Real-Time Insights',
    description: 'Stay ahead with accurate, real-time performance tracking',
    icon: '/icons/insight.svg', // Replace with your actual icons
  },
  {
    title: 'Measurable Growth',
    description: 'Monitor your progress and achieve sustainable growth',
    icon: '/icons/growth.svg',
  },
  {
    title: 'Seamless Collaboration',
    description: 'Streamline your workflow, all in one place with ease',
    icon: '/icons/collaboration.svg',
  },
]

const FeatureSection = () => {
  return (
    <section className="bg-black text-white py-24 px-6 md:px-16 lg:px-32">
      <div className="text-center mb-12 space-y-4">
        <Badge variant="outline" className="bg-white/5 text-white/80 px-3 py-1 uppercase tracking-widest">
          Features
        </Badge>
        <h2 className="text-4xl md:text-5xl font-bold">
          All features in <em className="italic font-light">1 tool</em>
        </h2>
        <p className="text-white/60 text-lg">
          Everything you need to collaborate, create, and scale, all in one place.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-gradient-to-b from-white/5 to-white/0 backdrop-blur-md p-8 border border-white/10 shadow-lg hover:scale-105 transition-transform"
          >
            <div className="mb-6">
              {/* Replace with actual icons or SVG */}
              <img src={feature.icon} alt={feature.title} className="h-10 w-10 opacity-80" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-white/60">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default FeatureSection
