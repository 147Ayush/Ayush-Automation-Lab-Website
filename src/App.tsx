import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServicesSection from './components/ServicesSection';
import ExpertiseSection from './components/ExpertiseSection';
import ProcessSection from './components/ProcessSection';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingPreset, setBookingPreset] = useState<string | undefined>(undefined);

  const handleOpenBooking = (serviceName?: string) => {
    setBookingPreset(serviceName);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setBookingPreset(undefined);
  };

  return (
    <div className="min-h-screen bg-surface selection:bg-primary-fixed flex flex-col justify-between relative">
      {/* Primary Top Navbar */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      {/* Main Content Layout */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero onOpenBooking={() => handleOpenBooking()} />

        {/* Services Bento Grid & Interactive Estimator */}
        <ServicesSection onOpenBooking={handleOpenBooking} />

        {/* Core Expertise Solutions */}
        <ExpertiseSection />

        {/* 3-Step Transformation Process */}
        <ProcessSection />

        {/* CTA Banner & Full Touch Forms */}
        <ContactForm onOpenBooking={() => handleOpenBooking()} />
      </main>

      {/* Footer Details */}
      <Footer onOpenBooking={() => handleOpenBooking()} />

      {/* Modals & Slideouts */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        initialService={bookingPreset}
      />
    </div>
  );
}
