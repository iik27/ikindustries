'use client';

import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import { PortfolioItems } from '@/lib/portfolio-items';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import { translations } from '@/lib/translations';

export default function PortfolioItemPage() {
  const { slug } = useParams();
  const { language } = useLanguage();
  const t = translations[language].portfolio;

  const item = PortfolioItems.find((p) => p.slug === slug);

  if (!item) {
    notFound();
  }

  const image = PlaceHolderImages.find((img) => img.id === item.imageId);
  
  const displayTitle = item.title;
  const displayDescription = language === 'en' ? item.description_en : item.description;
  const displayChallenge = language === 'en' ? item.challenge_en : item.challenge;
  const displaySolution = language === 'en' ? item.solution_en : item.solution;

  return (
    <>
      <Header />
      <main>
        <article className="bg-background pt-32 pb-16 sm:pt-40 sm:pb-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <Button variant="ghost" asChild className="pl-0">
                  <Link href="/portfolio">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {t.back}
                  </Link>
                </Button>
              </div>

              <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                {displayTitle}
              </h1>

              <p className="mt-4 text-lg text-foreground/70">
                {displayDescription}
              </p>

              {image && (
                <div className="aspect-video relative my-8 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={image.imageUrl}
                    alt={displayTitle}
                    fill
                    sizes="(max-width: 1024px) 100vw, 1024px"
                    className="object-cover"
                    data-ai-hint={image.imageHint}
                    priority
                  />
                </div>
              )}

              <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                <div className="md:col-span-2 prose mx-auto">
                    <h2>{t.about}</h2>
                    
                    <h3>{t.challenge}</h3>
                    <p>{displayChallenge}</p>

                    <h3>{t.solution}</h3>
                    <p>{displaySolution}</p>
                </div>
                <aside className="md:col-span-1">
                  <div className="sticky top-28 bg-secondary p-6 rounded-lg">
                    <h3 className="font-headline font-semibold text-lg text-foreground">{t.projectInfo}</h3>
                    
                    <div className="mt-4">
                      <h4 className="font-semibold text-sm text-foreground/80 mb-2">{t.technologies}</h4>
                      <div className="flex flex-wrap gap-2">
                        {item.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {(item.liveUrl || item.githubUrl) && (
                      <div className="mt-6 border-t pt-6">
                        <div className="flex flex-col gap-3">
                            {item.liveUrl && item.liveUrl !== '#' && (
                               <Button asChild variant="default">
                                    <a href={item.liveUrl} target="_blank" rel="noopener noreferrer">
                                        {t.liveProject}
                                        <ExternalLink className="ml-2 h-4 w-4" />
                                    </a>
                               </Button>
                            )}
                             {item.githubUrl && item.githubUrl !== '#' && (
                               <Button asChild variant="outline">
                                    <a href={item.githubUrl} target="_blank" rel="noopener noreferrer">
                                        <Github className="mr-2 h-4 w-4" />
                                        {t.github}
                                    </a>
                               </Button>
                            )}
                        </div>
                      </div>
                    )}
                  </div>
                </aside>
              </div>

            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}