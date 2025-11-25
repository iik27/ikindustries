import { Code, Github, Linkedin } from "lucide-react";
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-primary text-primary-foreground">
      <div className="container py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex justify-center md:justify-start items-center">
            <Link href="/" className="flex items-center gap-2 text-2xl font-headline font-bold">
              <Code className="h-8 w-8" />
              <span>IK Industries</span>
            </Link>
          </div>
          
          <div className="flex flex-col gap-2">
            <h3 className="font-headline font-semibold tracking-wider uppercase">Contact</h3>
            <a href="mailto:contact@ikindustries.com" className="hover:underline">contact@ikindustries.com</a>
            <p>Indonesia</p>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-headline font-semibold tracking-wider uppercase">Follow Us</h3>
            <div className="flex gap-4 justify-center md:justify-start">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:opacity-80 transition-opacity"><Github /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:opacity-80 transition-opacity"><Linkedin /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-primary-foreground/20 text-center text-sm text-primary-foreground/70">
          <p>&copy; {currentYear} IK Industries. All rights reserved. Developed by Muhamad Taufik Hidayat.</p>
        </div>
      </div>
    </footer>
  );
}
