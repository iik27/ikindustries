
'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import { Github, Linkedin, Mail, Phone } from "lucide-react";
import Link from 'next/link';

export default function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 text-2xl font-headline font-bold">
              <Image src="https://iili.io/ffDrAW7.png" alt="IK Labs Logo" width={32} height={32} className="rounded-full bg-white p-0.5" />
              <span>IK Labs</span>
            </Link>
            <p className="text-primary-foreground/70 text-sm max-w-xs">
              Spesialis pengembangan website profesional, aplikasi mobile performa tinggi, dan sistem internal perusahaan yang terintegrasi.
            </p>
          </div>
          
          <div className="flex flex-col gap-4">
            <h3 className="font-headline font-semibold text-lg">Hubungi Kami</h3>
            <div className="flex flex-col gap-3 text-sm">
              <a href="mailto:contact@ikindustries.com" className="flex items-center gap-3 hover:text-white transition-colors">
                <Mail className="h-4 w-4" />
                <span>contact@ikindustries.com</span>
              </a>
              <a href="https://wa.me/6281462202381" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-colors">
                <Phone className="h-4 w-4" />
                <span>+6281462202381</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-4 md:items-end">
            <h3 className="font-headline font-semibold text-lg">Ikuti Kami</h3>
            <div className="flex gap-4">
              <a href="https://github.com/iik27" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="bg-primary-foreground/10 p-2 rounded-full hover:bg-primary-foreground/20 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/in/iiiikkk" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="bg-primary-foreground/10 p-2 rounded-full hover:bg-primary-foreground/20 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-primary-foreground/60">
            &copy; {year || '2024'} IK Labs. Seluruh hak cipta dilindungi. Dikembangkan oleh Muhamad Taufik Hidayat.
          </p>
          <div className="flex gap-6 text-xs font-medium uppercase tracking-wider">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Kebijakan Privasi</Link>
            <Link href="/terms-of-service" className="hover:text-white transition-colors">Ketentuan Layanan</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
