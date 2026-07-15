import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServicesSection from './components/ServicesSection';
import ExpertiseSection from './components/ExpertiseSection';
import ProcessSection from './components/ProcessSection';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import AIChatDrawer from './components/AIChatDrawer';
import ServiceInquiryModal from './components/ServiceInquiryModal';
import { Service } from './types';
import { Bot, Sparkles, MessageSquare } from 'lucide-react';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingPreset, setBookingPreset] = useState<string | undefined>(undefined);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isServiceInquiryOpen, setIsServiceInquiryOpen] = useState(false);
  const [selectedServiceForInquiry, setSelectedServiceForInquiry] = useState<Service | null>(null);
  const [showSoonToast, setShowSoonToast] = useState(false);

  const handleChatClick = () => {
    setShowSoonToast(true);
    setTimeout(() => {
      setShowSoonToast(false);
    }, 4000);
  };

  const handleOpenBooking = (serviceName?: string) => {
    setBookingPreset(serviceName);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setBookingPreset(undefined);
  };

  const handleSelectService = (service: Service) => {
    setSelectedServiceForInquiry(service);
    setIsServiceInquiryOpen(true);
  };

  return (
    <div className="min-h-screen bg-surface selection:bg-primary-fixed flex flex-col justify-between relative">
      {/* Primary Top Navbar */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenAIChat={() => setIsChatOpen(true)}
      />

      {/* Main Content Layout */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero onOpenBooking={() => handleOpenBooking()} />

        {/* Services Bento Grid & Interactive Estimator */}
        <ServicesSection 
          onOpenBooking={handleOpenBooking} 
          onSelectService={handleSelectService}
        />

        {/* Core Expertise Solutions */}
        <ExpertiseSection />

        {/* 3-Step Transformation Process */}
        <ProcessSection />

        {/* CTA Banner & Full Touch Forms */}
        <ContactForm onOpenBooking={() => handleOpenBooking()} />
      </main>

      {/* Footer Details */}
      <Footer />

      {/* Modals & Slideouts */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        initialService={bookingPreset}
      />

      <ServiceInquiryModal
        isOpen={isServiceInquiryOpen}
        onClose={() => {
          setIsServiceInquiryOpen(false);
          setSelectedServiceForInquiry(null);
        }}
        service={selectedServiceForInquiry}
      />

      {/* AI Chat Drawer component */}
      <AIChatDrawer
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />

      {/* Floating alert toast */}
      <AnimatePresence>
        {showSoonToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-100 bg-white border-2 border-primary/20 shadow-2xl rounded-2xl p-4 max-w-sm flex items-start gap-3 text-left"
          >
            <div className="bg-primary/10 text-primary p-2 rounded-xl border border-primary/20 shrink-0">
              <MessageSquare className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-space font-bold text-xs text-on-surface">AI Assistant Upgrade</h4>
              <p className="text-[11px] text-on-surface-variant font-medium mt-1 leading-relaxed">
                This feature will be available soon! We are upgrading our custom AI automation assistant with advanced workflows.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Permanent floating AI assistant bubble */}
      <div className="fixed bottom-6 right-6 z-90">
        <button
          onClick={handleChatClick}
          className="bg-primary text-white p-4 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_35px_rgba(0,42,198,0.35)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center relative cursor-pointer group"
          title="Chat with Automation Lab AI"
          id="floating-ai-chat-bubble"
        >
          {/* Glowing pulse ring */}
          <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
          <Bot className="h-6 w-6 relative z-10" />
          
          <div className="absolute right-full mr-3 bg-white border border-outline-variant text-on-surface px-3 py-1.5 rounded-xl text-[10px] font-bold shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center gap-1">
            <Sparkles className="h-3.5 w-3.5 text-primary animate-pulse" />
            <span>Chat Live with our AI Agent</span>
          </div>
        </button>
      </div>
    </div>
  );
}
