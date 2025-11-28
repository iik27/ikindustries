import { notFound } from 'next/navigation';
import Image from 'next/image';
import { BlogPosts } from '@/lib/blog-posts';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return BlogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = BlogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const image = PlaceHolderImages.find((img) => img.id === post.imageId);

  return (
    <>
      <Header />
      <main>
        <article className="bg-background pt-32 pb-16 sm:pt-40 sm:pb-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <div className="mb-8">
                <Button variant="ghost" asChild className="pl-0">
                  <Link href="/blog">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Blog
                  </Link>
                </Button>
              </div>
              
              <div className="flex gap-2 mb-4">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                {post.title}
              </h1>

              <p className="mt-4 text-lg text-foreground/70">
                {post.date} &middot; by {post.author}
              </p>

              {image && (
                <div className="aspect-video relative my-8 rounded-lg overflow-hidden">
                  <Image
                    src={image.imageUrl}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 768px"
                    className="object-cover"
                    data-ai-hint={image.imageHint}
                    priority
                  />
                </div>
              )}

              <div
                className="prose mx-auto"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </div>
        </article>      </main>
      <Footer />
    </>
  );
}
