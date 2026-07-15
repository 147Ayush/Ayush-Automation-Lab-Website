import { useState } from 'react';
import { motion } from 'motion/react';
import { LineChart, Cpu, Rocket, ChevronRight, Play } from 'lucide-react';

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    {
      number: '01',
      title: 'Analyze',
      description: 'We map your current workflows and find high-impact automation opportunities.',
      details: 'Our engineering lab performs a thorough audit of your manual tasks, detailing hours lost, error potential, and exactly which software tools can be connected.',
      icon: <LineChart className="h-8 w-8 text-primary" />,
      activeIcon: <LineChart className="h-8 w-8 text-primary animate-bounce" />
    },
    {
      number: '02',
      title: 'Automate',
      description: 'Our engineering team builds and deploys your custom, scalable solutions.',
      details: 'We write clean, modular scripts, integrate webhooks, configure custom servers/DB connections, and wrap everything in high-end responsive dashboards.',
      icon: <Cpu className="h-8 w-8 text-primary" />,
      activeIcon: <Cpu className="h-8 w-8 text-white animate-spin" style={{ animationDuration: '6s' }} />
    },
    {
      number: '03',
      title: 'Optimize',
      description: 'Continuous monitoring and tuning ensures maximum ROI over time.',
      details: 'We set up real-time telemetry, monitor API run times, and run scheduled diagnostics to keep your pipelines running smoothly 24/7 without fail.',
      icon: <Rocket className="h-8 w-8 text-primary" />,
      activeIcon: <Rocket className="h-8 w-8 text-primary animate-pulse" />
    }
  ];

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto scroll-mt-24" id="process">
      {/* Container wrapper with border and shadow so it stands out */}
      <div className="bg-surface/45 backdrop-blur-md rounded-[32px] border-2 border-outline-variant/35 p-8 md:p-14 shadow-[0_15px_50px_rgba(0,0,0,0.04)] relative overflow-hidden">
        
        {/* Background soft glow lines */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full filter blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="text-center mb-16 relative z-10">
          <span className="text-primary font-space text-xs font-bold uppercase tracking-widest block mb-2">
            IMPLEMENTATION
          </span>
          <h2 className="font-space text-3xl md:text-4xl font-bold text-on-surface">
            The 3-Step Transformation Process
          </h2>
          <p className="text-sm text-on-surface-variant mt-2 max-w-xl mx-auto font-medium">
            How we take your business from repetitive operations to streamlined, scalable AI-powered automation.
          </p>
        </div>

        {/* Steps Content */}
        <div className="relative z-10">
          {/* Desktop connection bar (hidden on mobile) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-[2px] bg-outline-variant/30 -z-10" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {steps.map((step, idx) => {
              const isHovered = activeStep === idx;
              return (
                <motion.div
                  key={step.number}
                  onMouseEnter={() => setActiveStep(idx)}
                  onMouseLeave={() => setActiveStep(null)}
                  className="flex flex-col items-center text-center group cursor-pointer"
                  id={`process-step-${idx + 1}`}
                >
                  {/* Step Circle with responsive outer halo */}
                  <div
                    className={`w-20 h-20 rounded-full flex items-center justify-center shadow-md mb-6 ring-8 transition-all ${
                      idx === 1 
                        ? isHovered 
                          ? 'bg-primary ring-primary/25' 
                          : 'bg-primary ring-primary/10'
                        : isHovered 
                          ? 'bg-white ring-primary/25 scale-105 border-2 border-primary/20' 
                          : 'bg-white ring-white border-2 border-outline-variant/30'
                    }`}
                  >
                    {/* Handle icons based on step & hover */}
                    {idx === 1 ? (
                      <Cpu className={`h-8 w-8 text-white ${isHovered ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
                    ) : (
                      <div className="transition-transform duration-300 group-hover:scale-110">
                        {isHovered ? step.activeIcon : step.icon}
                      </div>
                    )}
                  </div>

                  <div className="relative">
                    <span className="text-[11px] font-bold text-primary/65 uppercase tracking-widest block mb-1">
                      Step {step.number}
                    </span>
                    <h4 className="font-space text-xl font-bold text-on-surface mb-3 group-hover:text-primary transition-colors">
                      {step.title}
                    </h4>
                    <p className="text-xs text-on-surface-variant max-w-xs leading-relaxed font-medium">
                      {step.description}
                    </p>

                    {/* Extra animated details visible on hover */}
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ 
                        height: isHovered ? 'auto' : 0, 
                        opacity: isHovered ? 1 : 0 
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden mt-4 bg-white/95 backdrop-blur-sm p-4 rounded-2xl border-2 border-outline-variant/30 shadow-md max-w-xs mx-auto"
                    >
                      <p className="text-[11px] text-on-surface-variant text-left leading-relaxed font-medium">
                        {step.details}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
