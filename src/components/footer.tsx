import Image from "next/image";
import { Github, Linkedin } from "lucide-react";
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
             <div className="flex justify-center md:justify-start items-center">
              <Link href="/" className="flex items-center gap-2 text-xl font-headline font-bold">
                <Image src="https://iili.io/ffDrAW7.png" alt="IK Industries Logo" width={28} height={28} className="rounded-full" />
                <span>IK Industries</span>
              </Link>
            </div>
            
            <div className="flex gap-4 sm:gap-6 text-sm">
                <Link href="/privacy-policy" className="hover:underline text-primary-foreground/80 hover:text-primary-foreground transition-colors">Kebijakan Privasi</Link>
                <Link href="/terms-of-service" className="hover:underline text-primary-foreground/80 hover:text-primary-foreground transition-colors">Ketentuan Layanan</Link>
            </div>

            <div className="flex gap-4 justify-center md:justify-start">
              <a href="https://github.com/iik27" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:opacity-80 transition-opacity"><Github /></a>
              <a href="https://www.linkedin.com/in/iiiikkk" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:opacity-80 transition-opacity"><Linkedin /></a>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 pt-6 text-center text-sm text-primary-foreground/70">
            <p>&copy; {currentYear} IK Industries. All rights reserved. Developed by Muhamad Taufik Hidayat.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
