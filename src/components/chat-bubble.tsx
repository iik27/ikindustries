
'use client';

import { cn } from '@/lib/utils';
import { User, Sparkles } from 'lucide-react';

interface ChatBubbleProps {
  role: 'user' | 'model';
  children: React.ReactNode;
}

export function ChatBubble({ role, children }: ChatBubbleProps) {
  const isUser = role === 'user';

  return (
    <div
      className={cn(
        'flex items-start gap-3 w-full',
        isUser ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      <div className={cn(
        "flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center shadow-sm",
        isUser ? "bg-primary text-primary-foreground" : "bg-secondary text-primary border border-primary/20"
      )}>
        {isUser ? <User className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
      </div>
      <div
        className={cn(
          'max-w-[85%] sm:max-w-[80%] rounded-2xl px-5 py-3 shadow-md transition-all',
          isUser
            ? 'bg-primary text-primary-foreground rounded-tr-none'
            : 'bg-card text-foreground border border-border/60 rounded-tl-none'
        )}
      >
        <div className={cn(
          "text-sm leading-relaxed",
          !isUser && "prose prose-sm dark:prose-invert max-w-none"
        )}>
          {children}
        </div>
      </div>
    </div>
  );
}
