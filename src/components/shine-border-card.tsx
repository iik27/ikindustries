"use client";

import React, { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ShineBorderCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  shineClassName?: string;
}

const ShineBorderCard = ({
  children,
  className,
  shineClassName,
  ...props
}: ShineBorderCardProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (wrapperRef.current) {
        const rect = wrapperRef.current.getBoundingClientRect();
        setCoords({ x: event.clientX - rect.left, y: event.clientY - rect.top });
      }
    };

    const currentRef = wrapperRef.current;
    if (currentRef) {
      currentRef.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div
      ref={wrapperRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group relative w-full overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-300",
        className,
      )}
      {...props}
    >
      {/* Shine effect */}
      <div
        className={cn(
          "absolute inset-0 -z-10 transition-all duration-500",
          isHovering ? "opacity-100" : "opacity-0",
          shineClassName
        )}
        style={
          {
            '--x': `${coords.x}px`,
            '--y': `${coords.y}px`,
            '--shine-gradient': 'radial-gradient(250px circle at var(--x) var(--y), hsl(var(--primary) / 0.4), transparent 80%)',
            WebkitMaskImage: 'var(--shine-gradient)',
            maskImage: 'var(--shine-gradient)',
          } as React.CSSProperties
        }
      />
      
      {/* Border glow */}
      <div className="absolute inset-0 -z-20 rounded-[inherit] bg-card [border:calc(1px)_solid_transparent] [border-radius:inherit] [box-shadow:0_0_0_1px_hsl(var(--border)),_0_4px_8px_hsl(var(--primary)/0.05)] group-hover:[border:calc(1px)_solid_hsl(var(--primary)/0.5)] transition-all duration-300" />
      
      {children}
    </div>
  );
};

export default ShineBorderCard;
