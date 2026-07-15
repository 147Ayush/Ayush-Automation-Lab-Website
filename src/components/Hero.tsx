import { MouseEvent } from 'react';
import { motion } from 'motion/react';
import { Play, Database, Sparkles, MessageSquare, ArrowRight, Zap, RefreshCw, Cpu } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
}

export default function Hero({ onOpenBooking }: HeroProps) {
  const handleExploreClick = (e: MouseEvent) => {
    e.preventDefault();
    const element = document.querySelector('#services');
    if (element) {
      const topOffset = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-6 max-w-7xl mx-auto overflow-hidden" id="hero">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left column: Typography and Triggers */}
        <div className="z-10 text-left">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-full mb-6">
              <Zap className="h-3 w-3 animate-pulse" /> Custom Workflows &amp; AI Lab
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-space text-4xl md:text-[56px] leading-[1.1] font-bold text-on-surface tracking-tight mb-6"
          >
            Streamline Your Future with <span className="text-primary block sm:inline">Intelligent Automation</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-on-surface-variant mb-8 max-w-xl leading-relaxed font-medium"
          >
            We design and implement custom automation workflows that save time, reduce errors, and scale your business operations with surgical precision.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <button
              onClick={handleExploreClick}
              className="bg-white border-2 border-primary text-primary px-8 py-3.5 rounded-full font-bold text-sm hover:bg-primary/5 transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
              id="hero-view-cases"
            >
              <span>Explore Solutions</span>
            </button>
          </motion.div>
        </div>

        {/* Right column: Interactive Flow Simulator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative h-[320px] sm:h-[400px] md:h-[440px] w-full bg-surface-container-low/60 rounded-[32px] border-2 border-outline-variant/35 overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.03)] p-4 md:p-6 flex items-center justify-center"
        >
          {/* Animated Background Grid Pattern */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <svg height="100%" width="100%">
              <pattern id="hero-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#004ac6" strokeWidth="0.5" />
              </pattern>
              <rect fill="url(#hero-grid)" width="100%" height="100%" />
            </svg>
          </div>

          {/* Interactive Automation Diagram */}
          <div className="relative w-full h-full max-w-md flex flex-col justify-between items-center py-6">
            
            {/* Row 1: Source webhook input node */}
            <div className="w-full flex justify-between items-center px-4">
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="flex items-center gap-3 bg-white p-3 rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.03)] border border-outline-variant/30 z-10"
              >
                <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center">
                  <RefreshCw className="h-4.5 w-4.5 text-primary animate-spin" style={{ animationDuration: '8s' }} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Trigger</p>
                  <p className="text-xs font-semibold text-on-surface">Form Submission</p>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 4, delay: 1, ease: 'easeInOut' }}
                className="flex items-center gap-3 bg-white p-3 rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.03)] border border-outline-variant/30 z-10"
              >
                <div className="w-9 h-9 bg-secondary/10 rounded-xl flex items-center justify-center">
                  <Database className="h-4.5 w-4.5 text-secondary" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">Source</p>
                  <p className="text-xs font-semibold text-on-surface">Client Database</p>
                </div>
              </motion.div>
            </div>

            {/* Connecting SVGs (laser beams) */}
            <div className="absolute inset-0 pointer-events-none z-0">
              <svg className="w-full h-full" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Paths */}
                <path d="M 70,60 L 200,180" stroke="url(#gradient-blue)" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M 330,60 L 200,180" stroke="url(#gradient-blue)" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M 200,180 L 100,320" stroke="url(#gradient-blue)" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M 200,180 L 300,320" stroke="url(#gradient-blue)" strokeWidth="2" strokeDasharray="4 4" />

                {/* Animated Light Pulses */}
                <motion.circle
                  r="4"
                  fill="#2563eb"
                  animate={{ cx: [70, 200], cy: [60, 180] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: 'linear' }}
                />
                <motion.circle
                  r="4"
                  fill="#006591"
                  animate={{ cx: [330, 200], cy: [60, 180] }}
                  transition={{ repeat: Infinity, duration: 2.5, delay: 1.25, ease: 'linear' }}
                />
                <motion.circle
                  r="4"
                  fill="#004ac6"
                  animate={{ cx: [200, 100], cy: [180, 320] }}
                  transition={{ repeat: Infinity, duration: 2, delay: 0.5, ease: 'linear' }}
                />
                <motion.circle
                  r="4"
                  fill="#2563eb"
                  animate={{ cx: [200, 300], cy: [180, 320] }}
                  transition={{ repeat: Infinity, duration: 2, delay: 1.5, ease: 'linear' }}
                />

                <defs>
                  <linearGradient id="gradient-blue" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2563eb" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#004ac6" stopOpacity="0.6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Row 2: Middle processing node (AI Smart Agent) */}
            <div className="z-10">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center bg-primary text-on-primary px-6 py-4 rounded-3xl shadow-lg border border-primary-fixed/20 relative cursor-pointer group"
                id="hero-processor-node"
              >
                <div className="absolute -top-3 bg-secondary-container text-on-secondary-container text-[8px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full shadow-sm">
                  AI ENGINE ACTIVE
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
                    <Sparkles className="h-5 w-5 text-secondary-fixed animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-space text-sm font-bold tracking-tight">AI Agent</h3>
                    <p className="text-[10px] text-white/80 font-medium">Parsing, Categorization &amp; Action</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Row 3: Destination nodes (CRM & Notification) */}
            <div className="w-full flex justify-between items-center px-4">
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 4, delay: 0.5, ease: 'easeInOut' }}
                className="flex items-center gap-3 bg-white p-3 rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.03)] border border-outline-variant/30 z-10"
              >
                <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Cpu className="h-4.5 w-4.5 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Update</p>
                  <p className="text-xs font-semibold text-on-surface">CRM Synchronized</p>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 4, delay: 1.5, ease: 'easeInOut' }}
                className="flex items-center gap-3 bg-white p-3 rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.03)] border border-outline-variant/30 z-10"
              >
                <div className="w-9 h-9 bg-secondary/10 rounded-xl flex items-center justify-center">
                  <MessageSquare className="h-4.5 w-4.5 text-secondary" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">Alert</p>
                  <p className="text-xs font-semibold text-on-surface">Slack Notify Sent</p>
                </div>
              </motion.div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
