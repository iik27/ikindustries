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
    ? "text-lg font-medium text-foreground hover:text-primary transition-colors py-2"
    : "text-sm font-medium text-foreground/80 hover:text-primary transition-colors";

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
    { href: '/#strengths', label: t.strengths },
    { href: '/portfolio', label: t.portfolio },
    { href: '/#testimonials', label: t.testimonials },
    { href: '/blog', label: t.blog },
    { href: '/#about', label: t.about },
    { href: '/#contact', label: t.contact },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-background/80 backdrop-blur-lg border-b' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile Header */}
        <div className="flex items-center justify-between h-20 md:hidden">
          <Link href="/" className="flex-shrink-0 flex items-center gap-2 text-2xl font-brand font-bold tracking-tight whitespace-nowrap">
            <div className="relative w-8 h-8 rounded-full overflow-hidden bg-white p-0.5 border border-primary/20 shadow-sm">
              <Image src="https://iili.io/ffDrAW7.png" alt="IK Labs Logo" fill className="object-contain" />
            </div>
            <span className="text-foreground">IK Labs</span>
          </Link>
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-background p-0">
                <SheetHeader className="p-6 pb-0 text-left">
                  <SheetTitle className="text-xl font-brand font-bold">IK Labs Menu</SheetTitle>
                  <SheetDescription className="sr-only">Navigasi utama.</SheetDescription>
                </SheetHeader>
                <div className="flex flex-col h-full p-6 pt-2">
                  <nav className="flex flex-col gap-4">
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

        {/* Desktop Header */}
        <div className="hidden md:flex flex-col items-center justify-center py-4">
          <div className="flex items-center justify-between w-full">
            <div className="w-1/3 flex items-center gap-4">
               <LanguageToggle />
            </div>
            <div className="w-1/3 flex justify-center">
              <Link href="/" className="flex-shrink-0 flex items-center gap-2 text-2xl font-brand font-bold tracking-tight whitespace-nowrap transition-opacity hover:opacity-80">
                <div className="relative w-9 h-9 rounded-full overflow-hidden bg-white p-0.5 border border-primary/20 shadow-sm">
                  <Image src="https://iili.io/ffDrAW7.png" alt="IK Labs Logo" fill className="object-contain" />
                </div>
                <span className="text-foreground">IK Labs</span>
              </Link>
            </div>
            <div className="w-1/3 flex justify-end">
              <ThemeToggle />
            </div>
          </div>
          <nav className="flex items-center gap-8 mt-5">
            {NAV_LINKS.map((link) => (
               <NavLink key={link.href} href={link.href} label={link.label} />
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}