import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Cpu, Settings, Check, ArrowRight, DollarSign, Clock, ChevronRight, X } from 'lucide-react';
import { SERVICES } from '../data';
import { Service } from '../types';
import ThreeDCard from './ThreeDCard';
import { sendTelegramNotification } from '../lib/telegram';

interface ServicesSectionProps {
  onOpenBooking: (serviceName: string) => void;
}

export default function ServicesSection({ onOpenBooking }: ServicesSectionProps) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
    sendTelegramNotification(
      `<b>New service interest</b>\nSomeone viewed: <b>${service.title}</b>\n${service.description}`
    );
  };
  
  // States for Calculator
  const [complexity, setComplexity] = useState<'standard' | 'advanced' | 'enterprise'>('advanced');
  const [hasEcommerce, setHasEcommerce] = useState(false);
  const [timelineSpeed, setTimelineSpeed] = useState<'normal' | 'rush'>('normal');

  // Interactive Price / Timeline Calculator
  const calculateEstimate = (serviceId: string) => {
    let basePrice = 0;
    let baseWeeks = 0;

    switch (serviceId) {
      case 'web-dev':
        basePrice = 4500;
        baseWeeks = 4;
        break;
      case 'app-dev':
        basePrice = 12000;
        baseWeeks = 8;
        break;
      case 'automation-dev':
        basePrice = 3000;
        baseWeeks = 3;
        break;
      default:
        basePrice = 5000;
        baseWeeks = 4;
    }

    // Complexity multiplier
    if (complexity === 'standard') {
      basePrice *= 0.85;
      baseWeeks = Math.max(1, Math.round(baseWeeks * 0.8));
    } else if (complexity === 'enterprise') {
      basePrice *= 1.5;
      baseWeeks = Math.round(baseWeeks * 1.3);
    }

    // Addons
    if (hasEcommerce) {
      basePrice += 1800;
      baseWeeks += 1;
    }

    // Timeline speed
    if (timelineSpeed === 'rush') {
      basePrice *= 1.25; // 25% rush fee
      baseWeeks = Math.max(1, Math.round(baseWeeks * 0.65)); // 35% faster
    }

    return {
      price: Math.round(basePrice),
      weeks: baseWeeks
    };
  };

  const getIcon = (name: string) => {
    switch (name) {
      case 'Globe':
        return <Globe className="h-6 w-6 text-primary" />;
      case 'Cpu':
        return <Cpu className="h-6 w-6 text-primary" />;
      case 'Settings':
        return <Settings className="h-6 w-6 text-primary" />;
      default:
        return <Globe className="h-6 w-6 text-primary" />;
    }
  };

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto scroll-mt-24" id="services">
      {/* Outer section wrapper with borders and custom shadow so it stands out */}
      <div className="bg-surface/45 backdrop-blur-md rounded-[32px] border-2 border-outline-variant/35 p-8 md:p-14 shadow-[0_15px_50px_rgba(0,0,0,0.04)]">
        
        {/* Section Header */}
        <div className="mb-12 text-left">
          <span className="text-primary font-space text-xs font-bold uppercase tracking-widest block mb-2">
            SERVICES
          </span>
          <h2 className="font-space text-3xl md:text-4xl font-bold text-on-surface">
            End-to-End Development &amp; Automation
          </h2>
          <p className="text-sm text-on-surface-variant mt-2 max-w-xl font-medium">
            Click any service block below to see the full scope, tech stack, and an instant price &amp; timeline estimate.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <ThreeDCard
              key={service.id}
              onClick={() => handleServiceClick(service)}
              className="bg-white p-8 rounded-[24px] shadow-[0px_8px_30px_rgba(0,0,0,0.02)] border-2 border-outline-variant/30 hover:shadow-lg transition-all cursor-pointer"
              id={`service-card-${service.id}`}
            >
              <div className="flex flex-col justify-between h-full">
                <div>
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 border border-primary/5">
                    {getIcon(service.iconName)}
                  </div>
                  <h3 className="font-space text-xl font-extrabold text-on-surface mb-3">
                    {service.title}
                  </h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed font-medium">
                    {service.description}
                  </p>
                </div>

                <div className="mt-8 flex items-center text-primary font-bold text-xs group">
                  <span>View Details &amp; Pricing</span>
                  <ChevronRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </ThreeDCard>
          ))}
        </div>
      </div>

      {/* Expanded Service Drawer */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-100 overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            {/* Content Drawer */}
            <div className="absolute inset-y-0 right-0 max-w-full flex">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="w-screen max-w-lg bg-white shadow-2xl flex flex-col h-full border-l border-outline-variant/30"
                id="service-drawer"
              >
                {/* Header */}
                <div className="px-6 py-5 border-b border-outline-variant/20 flex items-center justify-between bg-surface">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/10">
                      {getIcon(selectedService.iconName)}
                    </div>
                    <h3 className="font-space font-bold text-sm text-on-surface">
                      {selectedService.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedService(null)}
                    className="p-1.5 rounded-full hover:bg-surface-container text-on-surface-variant transition-colors"
                    aria-label="Close"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Body Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                  {/* Scope of Work */}
                  <div>
                    <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-4">
                      What's Included in the Scope
                    </h4>
                    <ul className="space-y-3">
                      {selectedService.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-on-surface-variant leading-relaxed font-medium">
                          <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Core Tech Stack */}
                  <div>
                    <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-3">
                      Recommended Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedService.techStack.map((tech) => (
                        <span key={tech} className="bg-surface-container-low border border-outline-variant/40 px-3 py-1 rounded-full text-[10px] font-bold text-on-surface">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Interactive Pricing Estimator */}
                  <div className="bg-surface p-5 rounded-2xl border-2 border-outline-variant/35 space-y-4 shadow-sm">
                    <div>
                      <h4 className="font-space font-extrabold text-xs text-on-surface">
                        Interactive Project Estimator
                      </h4>
                      <p className="text-[10px] text-on-surface-variant mt-0.5 font-medium">
                        Adjust criteria to calculate a real-time custom price and timeline estimate.
                      </p>
                    </div>

                    {/* Scale Option */}
                    <div className="space-y-2">
                      <span className="text-[11px] font-bold text-on-surface-variant">Project Scale / Complexity</span>
                      <div className="grid grid-cols-3 gap-2">
                        {(['standard', 'advanced', 'enterprise'] as const).map((lvl) => (
                          <button
                            key={lvl}
                            type="button"
                            onClick={() => setComplexity(lvl)}
                            className={`py-2 px-1 rounded-xl text-xs font-bold text-center border capitalize transition-all cursor-pointer ${
                              complexity === lvl
                                ? 'bg-primary border-primary text-white shadow-sm'
                                : 'bg-white border-outline-variant/50 text-on-surface-variant hover:bg-surface-container-low'
                            }`}
                          >
                            {lvl}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Checkbox add-ons */}
                    <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-outline-variant/20">
                      <div className="text-xs pr-2">
                        <p className="font-bold text-on-surface">Integrate E-commerce / Stripe Checkout</p>
                        <p className="text-[10px] text-on-surface-variant font-medium">Add subscriptions, shopping carts, or invoicing</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={hasEcommerce}
                        onChange={(e) => setHasEcommerce(e.target.checked)}
                        className="h-4.5 w-4.5 rounded border-outline-variant text-primary focus:ring-primary focus:ring-1 cursor-pointer"
                      />
                    </div>

                    {/* Timeline speeds */}
                    <div className="space-y-2">
                      <span className="text-[11px] font-bold text-on-surface-variant">Timeline Speed</span>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setTimelineSpeed('normal')}
                          className={`py-2 px-1 rounded-xl text-xs font-bold text-center border transition-all cursor-pointer ${
                            timelineSpeed === 'normal'
                              ? 'bg-primary border-primary text-white shadow-sm'
                              : 'bg-white border-outline-variant/50 text-on-surface-variant hover:bg-surface-container-low'
                          }`}
                        >
                          Standard Pace
                        </button>
                        <button
                          type="button"
                          onClick={() => setTimelineSpeed('rush')}
                          className={`py-2 px-1 rounded-xl text-xs font-bold text-center border transition-all cursor-pointer ${
                            timelineSpeed === 'rush'
                              ? 'bg-primary border-primary text-white shadow-sm'
                              : 'bg-white border-outline-variant/50 text-on-surface-variant hover:bg-surface-container-low'
                          }`}
                        >
                          Rush Schedule (+25%)
                        </button>
                      </div>
                    </div>

                    {/* Pricing Result */}
                    <div className="pt-4 border-t border-outline-variant/25 grid grid-cols-2 gap-4">
                      <div className="bg-primary/5 p-3 rounded-xl border border-primary/10">
                        <span className="text-[9px] font-bold text-primary uppercase tracking-widest block mb-0.5">ESTIMATED INVESTMENT</span>
                        <span className="font-space font-extrabold text-base text-primary flex items-center">
                          <DollarSign className="h-4 w-4 inline" />
                          {calculateEstimate(selectedService.id).price.toLocaleString()}
                        </span>
                      </div>
                      <div className="bg-primary/5 p-3 rounded-xl border border-primary/10">
                        <span className="text-[9px] font-bold text-primary uppercase tracking-widest block mb-0.5">ESTIMATED TIMELINE</span>
                        <span className="font-space font-extrabold text-base text-primary flex items-center gap-1">
                          <Clock className="h-4 w-4 inline" />
                          {calculateEstimate(selectedService.id).weeks} Weeks
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Trigger */}
                <div className="p-4 border-t border-outline-variant/20 bg-surface">
                  <button
                    onClick={() => {
                      const est = calculateEstimate(selectedService.id);
                      // Close drawer
                      setSelectedService(null);
                      // Open modal with preconfigured parameters
                      onOpenBooking(`${selectedService.title}`);
                    }}
                    className="w-full bg-primary text-on-primary py-3.5 rounded-full font-bold text-xs hover:bg-primary-container transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <span>Proceed with this configuration</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
