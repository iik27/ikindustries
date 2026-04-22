'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import { Github, Linkedin, Mail, Phone } from "lucide-react";
import Link from 'next/link';
import { useLanguage } from './language-provider';
import { translations } from '@/lib/translations';

export default function Footer() {
  const [year, setYear] = useState<number | null>(null);
  const { language } = useLanguage();
  const t = translations[language].footer;

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-slate-950 text-slate-200 border-t border-white/5 relative overflow-hidden">
      {/* Decorative Lab Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[120px] rounded-full -z-10" />
      
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-3 text-2xl font-brand font-bold tracking-tight transition-opacity hover:opacity-90">
              <div className="relative w-9 h-9 rounded-full overflow-hidden bg-white p-0.5 border border-primary/20 shadow-xl">
                <Image src="https://iili.io/ffDrAW7.png" alt="IK Labs Logo" fill className="object-contain" />
              </div>
              <span className="text-white">IK Labs</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              {t.description}
            </p>
          </div>
          
          <div className="flex flex-col gap-6">
            <h3 className="font-headline font-semibold text-lg text-white tracking-wide uppercase text-[10px] opacity-50">{t.contactTitle}</h3>
            <div className="flex flex-col gap-4 text-sm">
              <a href="mailto:contact@ikindustries.com" className="flex items-center gap-3 text-slate-300 hover:text-primary transition-colors group">
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Mail className="h-4 w-4" />
                </div>
                <span>contact@ikindustries.com</span>
              </a>
              <a href="https://wa.me/6281462202381" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-300 hover:text-primary transition-colors group">
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Phone className="h-4 w-4" />
                </div>
                <span>+6281462202381</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-6 md:items-end">
            <h3 className="font-headline font-semibold text-lg text-white tracking-wide uppercase text-[10px] opacity-50">{t.followTitle}</h3>
            <div className="flex gap-4">
              <a href="https://github.com/iik27" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="bg-white/5 p-3 rounded-xl hover:bg-primary hover:text-white transition-all transform hover:-translate-y-1">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/in/iiiikkk" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="bg-white/5 p-3 rounded-xl hover:bg-primary hover:text-white transition-all transform hover:-translate-y-1">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-xs text-slate-500 font-code tracking-widest text-center md:text-left">
            &copy; {year || '2024'} IK LABS SYSTEMS. {t.rights.toUpperCase()}
          </p>
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">{t.privacy}</Link>
            <Link href="/terms-of-service" className="hover:text-primary transition-colors">{t.terms}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}