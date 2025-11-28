"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme-toggle';

const NAV_LINKS = [
  { href: '/#development-process', label: 'Process' },
  { href: '/#services', label: 'Services' },
  { href: '/#strengths', label: 'Strengths' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/#testimonials', label: 'Testimonials' },
  { href: '/blog', label: 'Blog' },
  { href: '/#about', label: 'About' },
  { href: '/#contact', label: 'Contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NavLink = ({ href, label, isMobile = false, onClick }: { href: string, label: string, isMobile?: boolean, onClick?: () => void }) => {
    const isExternal = href.startsWith('http') || href.startsWith('#');
    const Component = isExternal ? 'a' : Link;
    const props = {
      href: href,
      onClick: onClick,
      className: isMobile 
        ? "text-lg font-medium text-foreground hover:text-primary transition-colors"
        : "text-sm font-medium text-foreground/80 hover:text-primary transition-colors",
      ...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })
    };
    // @ts-ignore
    return <Component {...props}>{label}</Component>;
  };

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
          <Link href="/" className="flex-shrink-0 flex items-center gap-2 text-2xl font-headline font-bold whitespace-nowrap">
            <Image src="https://iili.io/ffDrAW7.png" alt="IK Industries Logo" width={32} height={32} className="rounded-full" />
            <span>IK Industries</span>
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-background p-0">
                <SheetHeader className="p-6 pb-0">
                  <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                  <SheetDescription className="sr-only">A list of navigation links for the site.</SheetDescription>
                </SheetHeader>
                <div className="flex flex-col h-full p-6">
                  <Link href="/" className="flex items-center gap-2 text-2xl font-headline font-bold mb-8">
                      <Image src="https://iili.io/ffDrAW7.png" alt="IK Industries Logo" width={32} height={32} className="rounded-full" />
                      <span>IK Industries</span>
                  </Link>
                  <nav className="flex flex-col gap-6">
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
            <div className="w-1/3"></div> {/* Spacer */}
            <div className="w-1/3 flex justify-center">
              <Link href="/" className="flex-shrink-0 flex items-center gap-2 text-2xl font-headline font-bold whitespace-nowrap">
                <Image src="https://iili.io/ffDrAW7.png" alt="IK Industries Logo" width={32} height={32} className="rounded-full" />
                <span>IK Industries</span>
              </Link>
            </div>
            <div className="w-1/3 flex justify-end">
              <ThemeToggle />
            </div>
          </div>
          <nav className="flex items-center gap-6 mt-4">
            {NAV_LINKS.map((link) => (
               <NavLink key={link.href} href={link.href} label={link.label} />
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
