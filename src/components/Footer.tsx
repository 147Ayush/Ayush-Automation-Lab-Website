import { Instagram, Youtube, Twitter, Linkedin, Github, Fingerprint } from 'lucide-react';

export default function Footer() {
  const socialLinks = [
    { name: 'Instagram', icon: <Instagram className="h-5 w-5" />, href: (import.meta as any).env.VITE_SOCIAL_INSTAGRAM || 'https://instagram.com', color: 'hover:text-[#E1306C] hover:bg-[#E1306C]/10 hover:border-[#E1306C]/30' },
    { name: 'YouTube', icon: <Youtube className="h-5 w-5" />, href: (import.meta as any).env.VITE_SOCIAL_YOUTUBE || 'https://youtube.com', color: 'hover:text-[#FF0000] hover:bg-[#FF0000]/10 hover:border-[#FF0000]/30' },
    { name: 'Twitter / X', icon: <Twitter className="h-5 w-5" />, href: (import.meta as any).env.VITE_SOCIAL_TWITTER || 'https://x.com', color: 'hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/10 hover:border-[#1DA1F2]/30' },
    { name: 'Threads', icon: <Fingerprint className="h-5 w-5" />, href: (import.meta as any).env.VITE_SOCIAL_THREADS || 'https://threads.net', color: 'hover:text-[#000000] hover:bg-[#000000]/10 hover:border-[#000000]/30' },
    { name: 'LinkedIn', icon: <Linkedin className="h-5 w-5" />, href: (import.meta as any).env.VITE_SOCIAL_LINKEDIN || 'https://linkedin.com', color: 'hover:text-[#0077B5] hover:bg-[#0077B5]/10 hover:border-[#0077B5]/30' },
    { name: 'GitHub', icon: <Github className="h-5 w-5" />, href: (import.meta as any).env.VITE_SOCIAL_GITHUB || 'https://github.com', color: 'hover:text-[#333] hover:bg-[#333]/10 hover:border-[#333]/30' }
  ];

  return (
    <footer className="bg-white border-t-2 border-outline-variant/35 pt-16 pb-8 px-6 mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          {/* Brand details */}
          <div className="md:col-span-8 space-y-4">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="font-space text-2xl font-bold text-primary block tracking-tight"
            >
              Ayush Automation Lab
            </a>
            <p className="text-sm text-on-surface-variant leading-relaxed max-w-xl font-medium">
              Empowering global operations through custom automation architectures, production AI systems, and robust Python orchestration with surgical precision.
            </p>
          </div>

          {/* Connect links */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-space text-xs font-bold text-on-surface uppercase tracking-widest">
              Connect With Us
            </h4>
            <div className="grid grid-cols-3 gap-2 pt-1 max-w-[200px] md:max-w-none">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center w-10 h-10 rounded-xl border border-outline-variant/60 text-on-surface-variant transition-all cursor-pointer ${social.color}`}
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="pt-8 border-t border-outline-variant/25 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-on-surface-variant font-semibold">
          <div>
            © {new Date().getFullYear()} Ayush Automation Lab. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
