"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
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
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2 text-2xl font-headline font-bold">
            <Code className="h-8 w-8 text-primary" />
            <span>IK Industries</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
               <NavLink key={link.href} href={link.href} label={link.label} />
            ))}
          </nav>
          
          <div className="md:hidden">
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
                </SheetHeader>
                <div className="flex flex-col h-full p-6">
                   <Link href="/" className="flex items-center gap-2 text-2xl font-headline font-bold mb-8">
                      <Code className="h-8 w-8 text-primary" />
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
      </div>
    </header>
  );
}
