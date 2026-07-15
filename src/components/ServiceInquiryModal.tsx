import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Check, Loader2, Sparkles, Phone, Mail, User, Info, MessageSquare } from 'lucide-react';
import { Service } from '../types';
import { SERVICES } from '../data';

const COUNTRY_CODES = [
  { code: '+91', name: 'India', flag: '🇮🇳' },
  { code: '+1', name: 'US/CA', flag: '🇺🇸' },
  { code: '+44', name: 'UK', flag: '🇬🇧' },
  { code: '+61', name: 'Australia', flag: '🇦🇺' },
  { code: '+971', name: 'UAE', flag: '🇦🇪' },
  { code: '+65', name: 'Singapore', flag: '🇸🇬' },
  { code: '+49', name: 'Germany', flag: '🇩🇪' },
  { code: '+33', name: 'France', flag: '🇫🇷' },
  { code: '+81', name: 'Japan', flag: '🇯🇵' },
];

interface ServiceInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service | null;
}

export default function ServiceInquiryModal({ isOpen, onClose, service }: ServiceInquiryModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [phone, setPhone] = useState('');
  const [selectedServiceId, setSelectedServiceId] = useState('');
  const [requirements, setRequirements] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  // Sync state with selected service when modal opens
  useEffect(() => {
    if (service) {
      setSelectedServiceId(service.id);
    } else {
      setSelectedServiceId(SERVICES[0]?.id || '');
    }
    // Reset status
    setIsSuccess(false);
    setError('');
  }, [service, isOpen]);

  if (!isOpen) return null;

  const currentService = SERVICES.find(s => s.id === selectedServiceId) || service;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !requirements) {
      setError('Please fill in all required fields.');
      return;
    }

    setError('');
    setIsSubmitting(true);

    const fullPhone = `${countryCode} ${phone}`;
    const serviceTitle = currentService?.title || 'General Service inquiry';

    try {
      // 1. Send via EmailJS
      const serviceId = (import.meta as any).env.VITE_EMAILJS_SERVICE_ID || 'service_483zuet11';
      const templateId = (import.meta as any).env.VITE_EMAILJS_TEMPLATE_ID || 'template_falew1g81';
      const publicKey = (import.meta as any).env.VITE_EMAILJS_PUBLIC_KEY || 'eaBtfsmeqETchmYNk822';

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
            from_phone: fullPhone,
            message: `Service Requested: ${serviceTitle}\n\nClient Requirements:\n${requirements}`,
          }
        })
      });

      if (!emailJsResponse.ok) {
        console.error('EmailJS request failed for service inquiry:', await emailJsResponse.text());
      }

      // Send auto-reply template to client if available
      const autoReplyTemplateId = (import.meta as any).env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID || 'template_td359vk87';
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
              reply_to: 'ayushsoni07@ayushautomationlab.com',
            }
          })
        }).catch(err => console.error('Auto-reply failed for service inquiry:', err));
      }
    } catch (err) {
      console.error('EmailJS service inquiry failure:', err);
    }

    try {
      // 2. Send via Telegram Bot API
      const telegramBotToken = (import.meta as any).env.VITE_TELEGRAM_BOT_TOKEN || '8374027412:AAHNBzY0SU3UKdGWG6-FvUPS80Po52u-6Y7';
      const telegramChatId = (import.meta as any).env.VITE_TELEGRAM_CHAT_ID || '883445327';

      const telegramText = `<b>🛠️ New Service Requirements Received!</b>\n\n` +
        `<b>👤 Client Name:</b> ${name}\n` +
        `<b>✉️ Email:</b> ${email}\n` +
        `<b>📞 Phone:</b> ${fullPhone}\n` +
        `<b>🚀 Service Requested:</b> <u>${serviceTitle}</u>\n\n` +
        `<b>📝 Custom Requirements & Scope:</b>\n${requirements}`;

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
        console.error('Telegram dispatch failed for service inquiry:', await telegramResponse.text());
      }
    } catch (err) {
      console.error('Telegram dispatch failure for service inquiry:', err);
    }

    setIsSubmitting(false);
    setIsSuccess(true);
    
    // Clear inputs
    setName('');
    setEmail('');
    setPhone('');
    setRequirements('');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-100 flex items-center justify-center p-4 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Window content wrapper */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="relative bg-white w-full max-w-2xl rounded-[32px] border-2 border-outline-variant/40 shadow-2xl overflow-hidden z-10 flex flex-col"
        >
          {/* Header */}
          <div className="p-6 md:p-8 border-b border-outline-variant/20 flex justify-between items-center bg-[#FBFBFD]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/10">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-space text-lg font-bold text-on-surface">
                  Service inquiry &amp; Blueprint Setup
                </h3>
                <p className="text-xs text-on-surface-variant font-medium">
                  Provide your operational targets and request a custom scope
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-on-surface-variant hover:text-on-surface bg-surface-variant/40 hover:bg-surface-variant/80 rounded-xl transition-all cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {isSuccess ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-8 md:p-12 flex flex-col items-center text-center space-y-6"
            >
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center border border-success/25">
                <Check className="h-8 w-8 text-success stroke-[3]" />
              </div>
              <div className="space-y-2">
                <h4 className="font-space text-2xl font-bold text-on-surface">
                  Inquiry Dispatched Successfully!
                </h4>
                <p className="text-sm text-on-surface-variant max-w-md leading-relaxed font-medium">
                  Your requirements and custom details have been sent to Ayush via **Telegram** and **EmailJS**. We are reviewing your scope and will contact you shortly with a proposed blueprint layout.
                </p>
              </div>
              <button
                onClick={onClose}
                className="bg-primary text-on-primary font-bold text-xs px-8 py-3.5 rounded-full hover:bg-primary-container transition-all cursor-pointer"
              >
                Close Window
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6 flex-1 overflow-y-auto max-h-[75vh]">
              {error && (
                <div className="p-3 bg-error/5 text-error text-xs font-semibold rounded-xl border border-error/20">
                  {error}
                </div>
              )}

              {/* Grid block for inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* Full Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-on-surface-variant flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-primary" />
                    <span>Your Full Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="px-4 py-2.5 text-sm rounded-xl border border-outline-variant/60 bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-medium"
                  />
                </div>

                {/* Email Address */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-on-surface-variant flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5 text-primary" />
                    <span>Email Address *</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="px-4 py-2.5 text-sm rounded-xl border border-outline-variant/60 bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-medium"
                  />
                </div>

                {/* Contact Number with Country Code */}
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="text-xs font-bold text-on-surface-variant flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5 text-primary" />
                    <span>Contact Number *</span>
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="px-3 py-2.5 text-sm rounded-xl border border-outline-variant/60 bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-semibold text-on-surface cursor-pointer max-w-[120px]"
                    >
                      {COUNTRY_CODES.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.flag} {c.code}
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="98765 43210"
                      className="flex-1 min-w-0 px-4 py-2.5 text-sm rounded-xl border border-outline-variant/60 bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-medium"
                    />
                  </div>
                </div>

                {/* Service Selection Dropdown */}
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="text-xs font-bold text-on-surface-variant flex items-center gap-1.5">
                    <Info className="h-3.5 w-3.5 text-primary" />
                    <span>Selected Service Type *</span>
                  </label>
                  <select
                    value={selectedServiceId}
                    onChange={(e) => setSelectedServiceId(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-outline-variant/60 bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-semibold text-on-surface cursor-pointer"
                  >
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Requirement / Detail Notes Textarea */}
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="text-xs font-bold text-on-surface-variant flex items-center gap-1.5">
                    <MessageSquare className="h-3.5 w-3.5 text-primary" />
                    <span>Custom Requirements &amp; Project Details *</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                    placeholder="Please specify details about the features, CRM integrations, workflows, or specific pages you would like to build or consult on..."
                    className="w-full px-4 py-3 text-sm rounded-xl border border-outline-variant/60 bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-medium resize-none leading-relaxed"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-on-primary font-bold text-xs py-3.5 rounded-full hover:bg-primary-container shadow hover:shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4.5 w-4.5 animate-spin" />
                      <span>Sending Specifications...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Send inquiry Details (Email &amp; Telegram)</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
