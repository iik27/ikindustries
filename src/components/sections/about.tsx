'use client';

import { useState, useTransition, useRef, useEffect } from 'react';
import Image from "next/image";
import { Github, Linkedin, Send, MessageSquare } from "lucide-react";
import ReactMarkdown from 'react-markdown';

import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { ChatBubble } from '@/components/chat-bubble';

import { askMeAnything, type AskMeAnythingInput } from '@/ai/flows/ask-me-anything-flow';

type Message = {
  role: 'user' | 'model';
  content: string;
};

export default function About() {
  const profileImage = PlaceHolderImages.find(p => p.id === 'profile');
  
  const [conversation, setConversation] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isPending, startTransition] = useTransition();
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the bottom of the chat container when a new message is added
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [conversation]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isPending) return;

    const userMessage: Message = { role: 'user', content: inputValue };
    const newConversation = [...conversation, userMessage];
    setConversation(newConversation);
    setInputValue('');

    startTransition(async () => {
      try {
        const aiResponse = await askMeAnything({
          question: inputValue,
          history: newConversation.slice(0, -1) // Send history without the latest user message
        });
        const modelMessage: Message = { role: 'model', content: aiResponse.answer };
        setConversation(prev => [...prev, modelMessage]);
      } catch (error) {
        console.error("Error asking AI:", error);
        const errorMessage: Message = { role: 'model', content: "I'm sorry, I'm having a little trouble connecting right now. Please try again in a moment." };
        setConversation(prev => [...prev, errorMessage]);
      }
    });
  };

  return (
    <section id="about" className="bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-start">
          
          {/* Left Column: Profile Info & Chat Interface */}
          <div className="md:col-span-3">
            <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Meet the Enthusiast
            </h2>
            <p className="mt-4 text-lg text-foreground/80">
              Muhamad Taufik Hidayat, the part of IK Industries, is a passionate technologist with a drive for excellence and innovation. With years of experience in full-stack development, frond-end development & system analyst, he leads the company with a vision to create impactful digital solutions that solve real-world problems.
            </p>
            <p className="mt-4 text-foreground/80">
              His expertise spans across modern web technologies, scalable backend architectures, and intelligent system design. **Have a question? Ask my AI assistant below!**
            </p>
            <div className="mt-6 flex items-center gap-4">
              <Button variant="outline" size="icon" asChild>
                <a href="https://github.com/iik27" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="https://www.linkedin.com/in/iiiikkk" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
            </div>
            
            {/* Chat Interface */}
            <div className="mt-8 pt-8 border-t">
               <h3 className="text-xl font-headline font-semibold flex items-center gap-2">
                <MessageSquare className="h-6 w-6 text-primary"/>
                Ask Me Anything
              </h3>
              <div className="mt-4 border rounded-lg bg-secondary/30 h-96 flex flex-col">
                <div ref={chatContainerRef} className="flex-1 p-4 space-y-4 overflow-y-auto">
                  <ChatBubble role="model">
                    <p>Hello! I'm Iik's AI assistant. Feel free to ask me anything about my skills, projects, or services.</p>
                  </ChatBubble>
                  {conversation.map((msg, index) => (
                    <ChatBubble key={index} role={msg.role}>
                       <ReactMarkdown className="prose prose-sm prose-p:my-0">{msg.content}</ReactMarkdown>
                    </ChatBubble>
                  ))}
                  {isPending && (
                    <ChatBubble role="model">
                      <div className="flex items-center gap-2">
                        <Skeleton className="w-2 h-2 rounded-full animate-bounce" />
                        <Skeleton className="w-2 h-2 rounded-full animate-bounce delay-75" />
                        <Skeleton className="w-2 h-2 rounded-full animate-bounce delay-150" />
                      </div>
                    </ChatBubble>
                  )}
                </div>
                <form onSubmit={handleSubmit} className="p-4 border-t bg-background/50 rounded-b-lg">
                  <div className="relative">
                    <Input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="e.g., What is your favorite tech?"
                      className="pr-12"
                      disabled={isPending}
                    />
                    <Button type="submit" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" disabled={isPending || !inputValue.trim()}>
                      <Send className="h-4 w-4" />
                      <span className="sr-only">Send</span>
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Right Column: Profile Image */}
          <div className="md:col-span-2 md:sticky md:top-28">
            {profileImage && (
              <div className="aspect-square relative rounded-lg overflow-hidden shadow-lg transform transition-transform duration-500 hover:scale-105">
                <Image
                  src={profileImage.imageUrl}
                  alt={profileImage.description}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                  data-ai-hint={profileImage.imageHint}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
