import { useState, FormEvent } from 'react';
import { Mail, MapPin, Send, Check, Phone, ArrowUpRight } from 'lucide-react';
import { ContactMessage } from '../types';

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

interface ContactFormProps {
  onOpenBooking: () => void;
}

export default function ContactForm({ onOpenBooking }: ContactFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !message) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    setIsSubmitting(true);

    const fullPhone = `${countryCode} ${phone}`;

    const newMessage: ContactMessage = {
      id: `msg-${Date.now()}`,
      name,
      email,
      phone: fullPhone,
      message,
      createdAt: new Date().toISOString()
    };

    // Save message to localStorage
    const existing = localStorage.getItem('contact_messages');
    const messages = existing ? JSON.parse(existing) : [];
    messages.push(newMessage);
    localStorage.setItem('contact_messages', JSON.stringify(messages));

    // Dispatch custom event to notify components
    window.dispatchEvent(new Event('messages-updated'));

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
            message: message,
          }
        })
      });

      if (!emailJsResponse.ok) {
        console.error('EmailJS request failed:', await emailJsResponse.text());
      }

      // Also send auto-reply to client if template specified
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
        }).catch(err => console.error('Auto-reply failed:', err));
      }
    } catch (err) {
      console.error('EmailJS general failure:', err);
    }

    try {
      // 2. Send via Telegram Bot API
      const telegramBotToken = (import.meta as any).env.VITE_TELEGRAM_BOT_TOKEN || '8374027412:AAHNBzY0SU3UKdGWG6-FvUPS80Po52u-6Y7';
      const telegramChatId = (import.meta as any).env.VITE_TELEGRAM_CHAT_ID || '883445327';

      const telegramText = `<b>🆕 New Contact Form Submission</b>\n\n` +
        `<b>👤 Name:</b> ${name}\n` +
        `<b>✉️ Email:</b> ${email}\n` +
        `<b>📞 Phone:</b> ${fullPhone}\n\n` +
        `<b>💬 Message:</b>\n${message}`;

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

    setIsSubmitting(false);
    setIsSuccess(true);
    setName('');
    setEmail('');
    setCountryCode('+91');
    setPhone('');
    setMessage('');
  };

  const handleContactSalesClick = () => {
    const contactForm = document.getElementById('contact-form-anchor');
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-16">
      {/* CTA SECTION: Ready to reclaim your time? */}
      <section className="px-6 max-w-7xl mx-auto" id="cta-banner">
        <div className="bg-primary rounded-[32px] p-8 md:p-14 flex flex-col md:flex-row items-center justify-between text-on-primary gap-8 relative overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.12)] border-2 border-primary-container">
          {/* Decorative Grid SVG background */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg height="100%" preserveAspectRatio="none" viewBox="0 0 100 100" width="100%">
              <pattern height="10" id="cta-grid" patternUnits="userSpaceOnUse" width="10">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
              <rect fill="url(#cta-grid)" height="100%" width="100%" />
            </svg>
          </div>

          <div className="z-10 max-w-xl text-center md:text-left">
            <h2 className="font-space text-2xl md:text-3xl font-bold mb-4">
              Ready to reclaim your time?
            </h2>
            <p className="text-sm md:text-base opacity-90 leading-relaxed font-medium">
              Join forward-thinking companies that have saved over 10,000+ hours using our automation lab.
            </p>
          </div>

          <div className="z-10 flex flex-col sm:flex-row gap-4 w-full md:w-auto shrink-0">
            <button
              onClick={onOpenBooking}
              className="bg-white text-primary px-8 py-3.5 rounded-full font-bold text-sm hover:bg-on-primary-container hover:shadow-lg transition-all text-center active:scale-95 cursor-pointer"
            >
              Schedule My Audit
            </button>
            <button
              onClick={handleContactSalesClick}
              className="border-2 border-white/35 text-white px-8 py-3.5 rounded-full font-bold text-sm hover:bg-white/10 transition-all text-center active:scale-95 cursor-pointer"
            >
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION: Get in Touch */}
      <section className="py-12 px-6 max-w-7xl mx-auto scroll-mt-24" id="contact">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white p-8 md:p-14 rounded-[32px] border-2 border-outline-variant/35 shadow-[0_15px_45px_rgba(0,0,0,0.06)]" id="contact-form-anchor">
          
          {/* Left Column: Contact details */}
          <div className="space-y-6">
            <span className="text-primary font-space text-xs font-bold uppercase tracking-widest block">
              CONTACT
            </span>
            <h2 className="font-space text-3xl font-bold text-on-surface">
              Get in Touch
            </h2>
            <p className="text-sm text-on-surface-variant leading-relaxed max-w-md font-medium">
              Have a project in mind? Let's discuss how automation can transform your business. Complete the form and our engineer lab will respond inside 24 hours.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/5">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Email</p>
                  <p className="text-sm font-semibold text-on-surface">ayushsoni07@ayushautomationlab.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/5">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Location</p>
                  <p className="text-sm font-semibold text-on-surface">Global / Remote</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Message Form */}
          <div className="relative">
            {isSuccess ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 bg-surface rounded-2xl border border-outline-variant/20 animate-in fade-in zoom-in-95 duration-300">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Check className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-space font-bold text-xl text-on-surface">Message Received!</h3>
                <p className="text-xs text-on-surface-variant max-w-sm mt-2 leading-relaxed">
                  Thank you for reaching out. We have logged your message into our queue and dispatched an automatic alert to our slack. We'll be in touch shortly!
                </p>
                <button
                  type="button"
                  onClick={() => setIsSuccess(false)}
                  className="mt-6 text-xs text-primary font-bold hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {error && (
                  <div className="p-3 bg-error-container/40 text-error text-xs rounded-xl border border-error/10">
                    {error}
                  </div>
                )}

                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-name" className="text-xs font-bold text-on-surface-variant">Full Name *</label>
                  <input
                    type="text"
                    id="contact-name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-outline-variant/60 bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-medium"
                  />
                </div>

                {/* Email & Contact Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-email" className="text-xs font-bold text-on-surface-variant">Email Address *</label>
                    <input
                      type="email"
                      id="contact-email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-outline-variant/60 bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-medium"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-phone" className="text-xs font-bold text-on-surface-variant">Contact Number *</label>
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
                        id="contact-phone"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="98765 43210"
                        className="flex-1 min-w-0 px-4 py-2.5 text-sm rounded-xl border border-outline-variant/60 bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-medium"
                      />
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-message" className="text-xs font-bold text-on-surface-variant">Your Message *</label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your project..."
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-outline-variant/60 bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-medium resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary text-on-primary px-8 py-3 rounded-full font-bold text-sm hover:bg-primary-container hover:shadow-md transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="h-3.5 w-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}
