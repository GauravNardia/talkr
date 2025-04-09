"use client"
import { Check, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const plans = [
  {
    name: "Starter",
    price: "$29",
    description: "Perfect for small teams just getting started.",
    features: [
      "Up to 5 team members",
      "10 projects",
      "5GB storage",
      "Basic analytics",
      "24-hour support response time"
    ],
    popular: false,
    buttonText: "Get Started",
    buttonVariant: "outline" as const
  },
  {
    name: "Professional",
    price: "$79",
    description: "Ideal for growing teams and businesses.",
    features: [
      "Up to 20 team members",
      "Unlimited projects",
      "50GB storage",
      "Advanced analytics",
      "Priority support",
      "Custom integrations"
    ],
    popular: true,
    buttonText: "Get Started",
    buttonVariant: "default" as const
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Advanced features for large organizations.",
    features: [
      "Unlimited team members",
      "Unlimited projects",
      "Unlimited storage",
      "Custom analytics",
      "24/7 dedicated support",
      "Custom integrations",
      "On-premise deployment options",
      "SLA guarantees"
    ],
    popular: false,
    buttonText: "Contact Sales",
    buttonVariant: "outline" as const
  }
];

export const PricingSection = () => {
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

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section id="pricing" className="w-full py-24 bg-neutral-950">
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
            Simple, Transparent <span className="text-green-500">Pricing</span>
          </motion.h2>
          <motion.p 
            className="text-muted-foreground max-w-2xl mx-auto"
            variants={titleVariants}
          >
            Choose the plan that fits your needs. All plans include a 14-day free trial.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {plans.map((plan, index) => (
            <motion.div 
              key={index}
              className={`bg-neutral-900 border rounded-xl p-8 relative flex flex-col h-full ${
                plan.popular ? 'border-green-500' : 'border-neutral-800'
              }`}
              variants={cardVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                  <span className="inline-block bg-green-500 px-3 py-1 text-xs font-medium text-primary-foreground rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <div>
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-muted-foreground">/month</span>}
                </div>
                <p className="text-muted-foreground mb-6">{plan.description}</p>
              </div>
              <div className="mb-8 flex-grow">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="ml-3 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button 
                className={`w-full cursor-pointer text-black ${
                  plan.buttonVariant === 'default' ? 'bg-green-500 text-white hover:bg-green-600' : ''
                }`}
                variant={plan.buttonVariant}
              >
                {plan.buttonText}
              </Button>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-12 bg-card border border-border rounded-xl p-6 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Need a custom solution?</h3>
              <p className="text-muted-foreground text-sm">
                Contact our sales team to build a plan that perfectly matches your requirements.
              </p>
            </div>
            <Button variant="outline">Contact Sales</Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};