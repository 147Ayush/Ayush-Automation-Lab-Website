import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, Check, Briefcase, Mail, User, Building, Phone, ArrowRight, ArrowLeft } from 'lucide-react';
import { Consultation } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

const TIME_SLOTS = [
  '09:00 AM', '10:00 AM', '11:00 AM', 
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
];

const SERVICES_OPTIONS = [
  'Website Development',
  'Application Development',
  'Automation Development',
  'Technical Strategy Audit',
  'General Inquiry'
];

export default function BookingModal({ isOpen, onClose, initialService }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [serviceType, setServiceType] = useState(initialService || SERVICES_OPTIONS[0]);
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Handle service pre-loads on change of initialService
  useState(() => {
    if (initialService) {
      setServiceType(initialService);
    }
  });

  const validateStep = (currentStep: number): boolean => {
    setError('');
    if (currentStep === 1) {
      if (!name.trim()) {
        setError('Please enter your full name.');
        return false;
      }
      if (!email.trim() || !email.includes('@')) {
        setError('Please enter a valid email address.');
        return false;
      }
      if (!phone.trim() || phone.trim().length < 8) {
        setError('Please enter a valid contact number.');
        return false;
      }
    } else if (currentStep === 2) {
      if (!serviceType) {
        setError('Please select a service type.');
        return false;
      }
    } else if (currentStep === 3) {
      if (!date) {
        setError('Please select a preferred date.');
        return false;
      }
      if (!timeSlot) {
        setError('Please choose a preferred time slot.');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setError('');
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setIsSubmitting(true);
    const animationPromise = new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      const newBooking: Consultation = {
        id: `booking-${Date.now()}`,
        name,
        email,
        phone,
        company,
        serviceType,
        date,
        timeSlot,
        notes,
        status: 'confirmed',
        createdAt: new Date().toISOString()
      };

      // Save to localStorage
      const existing = localStorage.getItem('booked_consultations');
      const bookings = existing ? JSON.parse(existing) : [];
      bookings.push(newBooking);
      localStorage.setItem('booked_consultations', JSON.stringify(bookings));

      // Dispatch custom event to notify components
      window.dispatchEvent(new Event('bookings-updated'));

      try {
        // 1. Send via EmailJS
        // @ts-ignore
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_483zuet';
        // @ts-ignore
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_falew1g';
        // @ts-ignore
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'eaBtfsmeqETchmYNk';

        const emailJsResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            service_id: serviceId,
            template_id: templateId,
            user_id: publicKey,
            template_params: {
              to_name: 'Ayush',
              from_name: name,
              from_email: email,
              from_phone: phone,
              message: `Consultation Booking Scheduled:\nDate: ${date}\nTime: ${timeSlot}\nService: ${serviceType}\nCompany: ${company || 'N/A'}\nNotes: ${notes || 'None'}`,

              // Additional fallback parameters for common custom templates
              name: name,
              email: email,
              phone: phone,
              phone_number: phone,
              message_html: `Consultation Booking Scheduled:\nDate: ${date}\nTime: ${timeSlot}\nService: ${serviceType}\nCompany: ${company || 'N/A'}\nNotes: ${notes || 'None'}`,
              service_type: serviceType,
              service: serviceType,
              date: date,
              time: timeSlot,
              time_slot: timeSlot,
              company: company,
              notes: notes,
              reply_to: email,

              // Multi-variable fallbacks for client info in templates
              client_name: name,
              customer_name: name,
              user_name: name,
              sender_name: name,
              client_email: email,
              customer_email: email,
              user_email: email,
              sender_email: email,
              client_phone: phone,
              customer_phone: phone,
              user_phone: phone,
              contact_number: phone,

              // Recipient routing fallbacks in case template uses dynamic recipient email
              to_email: 'ayushsoni07@ayushautomation.com',
              to: 'ayushsoni07@ayushautomation.com',
              admin_email: 'ayushsoni07@ayushautomation.com',
              recipient_email: 'ayushsoni07@ayushautomation.com',
              receiver_email: 'ayushsoni07@ayushautomation.com',
              owner_email: 'ayushsoni07@ayushautomation.com',
              email_to: 'ayushsoni07@ayushautomation.com',
              recipient: 'ayushsoni07@ayushautomation.com',
            }
          })
        });

        if (!emailJsResponse.ok) {
          const errText = await emailJsResponse.text();
          console.error('EmailJS booking notification failed:', errText);
          throw new Error(errText);
        }

        // Also send auto-reply to client
        // @ts-ignore
        const autoReplyTemplateId = import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID || 'template_td359vk';
        if (autoReplyTemplateId) {
          await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              service_id: serviceId,
              template_id: autoReplyTemplateId,
              user_id: publicKey,
              template_params: {
                to_name: name,
                to_email: email,
                reply_to: 'ayushsoni07@ayushautomation.com',

                // Fallbacks
                name: name,
                email: email,
              }
            })
          }).catch(err => console.error('Auto-reply failed:', err));
        }
      } catch (err: any) {
        console.error('EmailJS booking general failure:', err);
        setError(`Email sending error: ${err.message || err}. (Your booking is still being sent to Telegram)`);
      }

      try {
        // 2. Send via Telegram Bot API
        // @ts-ignore
        const telegramBotToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || '8374027412:AAHNBzY0SU3UKdGWG6-FvUPS80Po52u-6Y7';
        // @ts-ignore
        const telegramChatId = import.meta.env.VITE_TELEGRAM_CHAT_ID || '883445327';

        const telegramText = `<b>📅 New Consultation Booking Secured!</b>\n\n` +
          `<b>👤 Client:</b> ${name}\n` +
          `<b>✉️ Email:</b> ${email}\n` +
          `<b>📞 Phone:</b> ${phone}\n` +
          `<b>🏢 Company:</b> ${company || 'N/A'}\n` +
          `<b>🛠️ Service:</b> ${serviceType}\n` +
          `<b>📆 Date:</b> ${date}\n` +
          `<b>⏰ Time:</b> ${timeSlot}\n\n` +
          `<b>📝 Notes:</b>\n${notes || 'None'}`;

        const telegramResponse = await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: telegramChatId,
            text: telegramText,
            parse_mode: 'HTML'
          })
        });

        if (!telegramResponse.ok) {
          console.error('Telegram dispatch failed:', await telegramResponse.text());
        }
      } catch (err) {
        console.error('Telegram dispatch failure:', err);
      }

      // Wait for at least the full animation length before completing
      await animationPromise;
      setIsSubmitted(true);
    } catch (err) {
      console.error('Submit error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setName('');
    setEmail('');
    setPhone('');
    setCompany('');
    setServiceType(SERVICES_OPTIONS[0]);
    setDate('');
    setTimeSlot('');
    setNotes('');
    setIsSubmitted(false);
    setIsSubmitting(false);
    setError('');
  };

  const handleCloseClick = () => {
    resetForm();
    onClose();
  };

  const stepPercentage = (step / 3) * 100;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseClick}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="flex min-h-screen items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative w-full max-w-xl rounded-3xl bg-white p-6 md:p-8 shadow-2xl border border-outline-variant/30"
              id="booking-modal-content"
            >
              {/* Close Button */}
              <button
                id="close-booking-modal"
                onClick={handleCloseClick}
                className="absolute right-4 top-4 rounded-full p-2 text-on-surface-variant hover:bg-surface-container-low transition-colors"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>

              {isSubmitting ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-12"
                >
                  <div className="relative w-20 h-20 mb-8 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-ping" />
                    <div className="w-16 h-16 rounded-full border-4 border-primary/15 border-t-primary animate-spin" />
                  </div>
                  <h2 className="font-space text-2xl font-bold text-on-surface mb-2">
                    Submitting Request...
                  </h2>
                  <p className="text-sm text-on-surface-variant max-w-sm leading-relaxed font-medium">
                    We are registering your consultation details with our secure automation engine. Please hold on a moment...
                  </p>
                </motion.div>
              ) : !isSubmitted ? (
                <>
                  <div className="mb-6">
                    <span className="text-primary font-space text-[10px] font-bold uppercase tracking-widest block mb-1">
                      STEP {step} OF 3
                    </span>
                    <h2 className="font-space text-2xl font-bold text-on-surface">
                      Book a Free Consultation
                    </h2>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-outline-variant/30 h-1.5 rounded-full mt-3 overflow-hidden">
                      <motion.div
                        className="bg-primary h-full rounded-full"
                        animate={{ width: `${stepPercentage}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>

                  <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
                    {error && (
                      <div className="p-3 bg-error-container/40 text-error text-xs font-medium rounded-xl border border-error/10">
                        {error}
                      </div>
                    )}

                    <AnimatePresence mode="wait">
                      {step === 1 && (
                        <motion.div
                          key="step-1"
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-4"
                        >
                          <div className="p-4 rounded-2xl bg-surface/50 border border-outline-variant/20 mb-2">
                            <p className="text-xs text-on-surface-variant font-medium leading-relaxed">
                              Let's start with your contact details. This helps us personalize your custom system roadmap.
                            </p>
                          </div>

                          {/* Full Name */}
                          <div className="flex flex-col gap-1.5">
                            <label htmlFor="modal-name" className="text-xs font-semibold text-on-surface-variant flex items-center gap-1">
                              <User className="h-3 w-3 text-primary" /> Full Name *
                            </label>
                            <input
                              type="text"
                              id="modal-name"
                              required
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="John Doe"
                              className="w-full px-4 py-2.5 text-sm rounded-xl border border-outline-variant bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                            />
                          </div>

                          {/* Email & Phone */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                              <label htmlFor="modal-email" className="text-xs font-semibold text-on-surface-variant flex items-center gap-1">
                                <Mail className="h-3 w-3 text-primary" /> Email Address *
                              </label>
                              <input
                                type="email"
                                id="modal-email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="john@example.com"
                                className="w-full px-4 py-2.5 text-sm rounded-xl border border-outline-variant bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                              />
                            </div>

                            <div className="flex flex-col gap-1.5">
                              <label htmlFor="modal-phone" className="text-xs font-semibold text-on-surface-variant flex items-center gap-1">
                                <Phone className="h-3 w-3 text-primary" /> Contact Number *
                              </label>
                              <input
                                type="tel"
                                id="modal-phone"
                                required
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="+1 (555) 019-2834"
                                className="w-full px-4 py-2.5 text-sm rounded-xl border border-outline-variant bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                              />
                            </div>
                          </div>

                          {/* Company Name */}
                          <div className="flex flex-col gap-1.5">
                            <label htmlFor="modal-company" className="text-xs font-semibold text-on-surface-variant flex items-center gap-1">
                              <Building className="h-3 w-3 text-primary" /> Company / Organization (Optional)
                            </label>
                            <input
                              type="text"
                              id="modal-company"
                              value={company}
                              onChange={(e) => setCompany(e.target.value)}
                              placeholder="Acme Corp"
                              className="w-full px-4 py-2.5 text-sm rounded-xl border border-outline-variant bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                            />
                          </div>
                        </motion.div>
                      )}

                      {step === 2 && (
                        <motion.div
                          key="step-2"
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-4"
                        >
                          <div className="p-4 rounded-2xl bg-surface/50 border border-outline-variant/20 mb-2">
                            <p className="text-xs text-on-surface-variant font-medium leading-relaxed">
                              Tell us what you want to build or streamline. What business bottleneck keeps you awake?
                            </p>
                          </div>

                          {/* Preferred Service */}
                          <div className="flex flex-col gap-1.5">
                            <label htmlFor="modal-service" className="text-xs font-semibold text-on-surface-variant flex items-center gap-1">
                              <Briefcase className="h-3 w-3 text-primary" /> Preferred Core Solution
                            </label>
                            <select
                              id="modal-service"
                              value={serviceType}
                              onChange={(e) => setServiceType(e.target.value)}
                              className="w-full px-4 py-2.5 text-sm rounded-xl border border-outline-variant bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none"
                            >
                              {SERVICES_OPTIONS.map((opt) => (
                                <option key={opt} value={opt}>{opt}</option>
                              ))}
                            </select>
                          </div>

                          {/* Notes / Bottlenecks */}
                          <div className="flex flex-col gap-1.5">
                            <label htmlFor="modal-notes" className="text-xs font-semibold text-on-surface-variant">
                              Describe your custom needs or bottlenecks (Optional)
                            </label>
                            <textarea
                              id="modal-notes"
                              rows={5}
                              value={notes}
                              onChange={(e) => setNotes(e.target.value)}
                              placeholder="e.g. We spend hours manually matching CRM data and looking up lead numbers on spreadsheets, looking for an automated AI Agent and custom n8n loop..."
                              className="w-full px-4 py-3 text-sm rounded-xl border border-outline-variant bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                            />
                          </div>
                        </motion.div>
                      )}

                      {step === 3 && (
                        <motion.div
                          key="step-3"
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-4"
                        >
                          <div className="p-4 rounded-2xl bg-surface/50 border border-outline-variant/20 mb-2">
                            <p className="text-xs text-on-surface-variant font-medium leading-relaxed">
                              Choose a target date and time slot for our 1-on-1 strategic session.
                            </p>
                          </div>

                          {/* Select Date */}
                          <div className="flex flex-col gap-1.5">
                            <label htmlFor="modal-date" className="text-xs font-semibold text-on-surface-variant flex items-center gap-1">
                              <Calendar className="h-3 w-3 text-primary" /> Preferred Date *
                            </label>
                            <input
                              type="date"
                              id="modal-date"
                              required
                              min={new Date().toISOString().split('T')[0]}
                              value={date}
                              onChange={(e) => setDate(e.target.value)}
                              className="w-full px-4 py-2.5 text-sm rounded-xl border border-outline-variant bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                            />
                          </div>

                          {/* Time Slots */}
                          <div className="flex flex-col gap-1.5">
                            <span className="text-xs font-semibold text-on-surface-variant flex items-center gap-1">
                              <Clock className="h-3 w-3 text-primary" /> Preferred Time Slot *
                            </span>
                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 border border-outline-variant rounded-xl bg-surface">
                              {TIME_SLOTS.map((slot) => (
                                <button
                                  key={slot}
                                  type="button"
                                  onClick={() => setTimeSlot(slot)}
                                  className={`py-2 px-1 text-xs rounded-lg text-center font-semibold transition-all ${
                                    timeSlot === slot
                                      ? 'bg-primary text-white shadow-sm'
                                      : 'bg-white text-on-surface border border-outline-variant/55 hover:bg-surface-container'
                                  }`}
                                >
                                  {slot}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Preview/Summary Card */}
                          <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 mt-4 text-xs space-y-1 text-on-surface">
                            <p className="font-bold text-primary">Session Summary:</p>
                            <p><span className="font-medium text-on-surface-variant">Client:</span> {name} ({company || 'Individual'})</p>
                            <p><span className="font-medium text-on-surface-variant">Focus:</span> {serviceType}</p>
                            <p><span className="font-medium text-on-surface-variant">Phone:</span> {phone}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="pt-4 flex items-center justify-between border-t border-outline-variant/20">
                      {step > 1 ? (
                        <button
                          type="button"
                          onClick={handleBack}
                          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-outline-variant text-on-surface-variant hover:bg-surface-container transition-all active:scale-95 text-xs font-bold"
                        >
                          <ArrowLeft className="h-4 w-4" />
                          <span>Back</span>
                        </button>
                      ) : (
                        <div />
                      )}

                      {step < 3 ? (
                        <button
                          type="button"
                          onClick={handleNext}
                          className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-primary text-white hover:bg-primary-container transition-all active:scale-95 text-xs font-bold shadow-sm"
                        >
                          <span>Next Step</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={handleSubmit}
                          className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-primary text-white hover:bg-primary-container transition-all active:scale-95 text-xs font-bold shadow-md"
                        >
                          <span>Confirm Booking</span>
                          <Check className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </form>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-8"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                    <Check className="h-8 w-8 text-primary animate-bounce" />
                  </div>
                  <h2 className="font-space text-2xl font-bold text-on-surface mb-2">
                    Consultation Secured!
                  </h2>
                  <p className="text-sm text-on-surface-variant max-w-sm mb-6 leading-relaxed">
                    Thank you, <span className="font-semibold text-on-surface">{name}</span>. We have received your consultation details for <span className="font-semibold text-on-surface">{timeSlot}</span> on <span className="font-semibold text-on-surface">{date}</span>. We will check slot availability; if it is available we will book your consultation, and if not possible in your requested slot, we will inform you and suggest a different slot. A confirmation log has been prepared for <span className="font-semibold text-on-surface">{phone}</span> and details sent to <span className="font-semibold text-on-surface">{email}</span>.
                  </p>
                  <button
                    onClick={handleCloseClick}
                    className="bg-primary text-on-primary px-8 py-2.5 rounded-full text-sm font-semibold hover:bg-primary-container transition-all shadow-sm"
                  >
                    Return to Site
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
