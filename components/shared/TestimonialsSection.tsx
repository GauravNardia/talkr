"use client"
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const testimonials = [
  {
    content: "AuraGreen transformed how our team collaborates. The interface is intuitive and the features are exactly what we needed.",
    author: "Sarah Johnson",
    role: "CTO at TechFlow",
    company: "TechFlow",
    avatar: "https://i.pravatar.cc/150?img=1"
  },
  {
    content: "We've tried many collaboration tools, but nothing comes close to the efficiency and ease-of-use of AuraGreen. It's been a game changer for our remote team.",
    author: "Michael Chen",
    role: "Product Manager",
    company: "Innovate Inc",
    avatar: "https://i.pravatar.cc/150?img=3"
  },
  {
    content: "The analytics and reporting features alone are worth the price. We've gained invaluable insights that have helped us optimize our workflow.",
    author: "Jessica Alvarez",
    role: "Operations Director",
    company: "Global Solutions",
    avatar: "https://i.pravatar.cc/150?img=5"
  },
];

export const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const testimonialVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section id="testimonials" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6" ref={ref}>
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            variants={titleVariants}
          >
            Trusted by <span className="text-primary">Innovative Teams</span>
          </motion.h2>
          <motion.p 
            className="text-muted-foreground max-w-2xl mx-auto"
            variants={titleVariants}
          >
            See what our customers have to say about their experience with AuraGreen.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300"
              variants={testimonialVariants}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            >
              <p className="text-foreground mb-6 italic">"{testimonial.content}"</p>
              <Separator className="mb-6" />
              <div className="flex items-center">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.author} 
                  className="h-10 w-10 rounded-full object-cover mr-4" 
                />
                <div>
                  <p className="font-semibold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-16 flex flex-wrap justify-center items-center gap-8 opacity-80"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 0.8, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {/* Company logos */}
          <div className="h-8 w-24 bg-foreground/20 rounded flex items-center justify-center">
            <span className="font-semibold text-sm text-foreground/60">Company A</span>
          </div>
          <div className="h-8 w-24 bg-foreground/20 rounded flex items-center justify-center">
            <span className="font-semibold text-sm text-foreground/60">Company B</span>
          </div>
          <div className="h-8 w-24 bg-foreground/20 rounded flex items-center justify-center">
            <span className="font-semibold text-sm text-foreground/60">Company C</span>
          </div>
          <div className="h-8 w-24 bg-foreground/20 rounded flex items-center justify-center">
            <span className="font-semibold text-sm text-foreground/60">Company D</span>
          </div>
          <div className="h-8 w-24 bg-foreground/20 rounded flex items-center justify-center">
            <span className="font-semibold text-sm text-foreground/60">Company E</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};