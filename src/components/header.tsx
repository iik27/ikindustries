
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme-toggle';
import { LanguageToggle } from '@/components/language-toggle';
import { useLanguage } from './language-provider';
import { translations } from '@/lib/translations';

interface NavLinkProps {
  href: string;
  label: string;
  isMobile?: boolean;
  onClick?: () => void;
}

const NavLink = ({ href, label, isMobile = false, onClick }: NavLinkProps) => {
  const isExternal = href.startsWith('http') || href.startsWith('#');
  const className = isMobile 
    ? "text-lg font-brand font-semibold text-foreground hover:text-primary transition-colors py-4 border-b border-border/50"
    : "text-[12px] font-brand font-bold text-foreground/70 hover:text-primary transition-all uppercase tracking-[0.15em] relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all hover:after:w-full";

  if (isExternal) {
    return (
      <a 
        href={href} 
        onClick={onClick} 
        className={className}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {label}
      </a>
    );
  }

  return (
    <Link href={href} onClick={onClick} className={className}>
      {label}
    </Link>
  );
};

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language } = useLanguage();
  const t = translations[language].nav;

  const NAV_LINKS = [
    { href: '/#development-process', label: t.process },
    { href: '/#services', label: t.services },
    { href: '/portfolio', label: t.portfolio },
    { href: '/blog', label: t.blog },
    { href: '/#about', label: t.about },
    { href: '/#contact', label: t.contact },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-16',
        isScrolled 
          ? 'bg-background/80 backdrop-blur-lg border-b shadow-[0_4px_30px_rgba(0,0,0,0.03)]' 
          : 'bg-background/40 backdrop-blur-sm border-b border-border/10'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          <Link href="/" className="flex items-center gap-3 transition-transform hover:scale-105 active:scale-95 group">
            <div className="relative w-9 h-9 rounded-full overflow-hidden bg-white p-0.5 border border-primary/20 shadow-lg group-hover:shadow-primary/30 transition-shadow">
              <Image src="https://iili.io/ffDrAW7.png" alt="IK Labs Logo" fill className="object-contain" />
            </div>
            <span className="text-xl font-brand font-bold tracking-tight text-foreground">IK Labs</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.href} href={link.href} label={link.label} />
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 p-1 bg-secondary/50 rounded-full border border-border/50 backdrop-blur-sm">
              <LanguageToggle />
              <ThemeToggle />
            </div>

            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 hover:bg-primary/10">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-[380px] bg-background border-l">
                <SheetHeader className="p-4 pb-2 text-left border-b">
                  <div className="flex items-center justify-between">
                    <SheetTitle className="text-2xl font-brand font-bold">IK Labs</SheetTitle>
                  </div>
                  <SheetDescription className="sr-only">Navigasi utama situs.</SheetDescription>
                </SheetHeader>
                <div className="flex flex-col h-full p-6 pt-8 space-y-2">
                  <nav className="flex flex-col">
                    {NAV_LINKS.map((link) => (
                      <NavLink 
                        key={link.href} 
                        href={link.href} 
                        label={link.label} 
                        isMobile 
                        onClick={() => setIsMobileMenuOpen(false)}
                      />
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
