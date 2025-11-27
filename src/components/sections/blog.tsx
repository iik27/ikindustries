import Image from "next/image";
import { BlogPosts } from "@/lib/blog-posts";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import ShineBorderCard from "@/components/shine-border-card";

export default function Blog() {
  const blogImages = PlaceHolderImages.filter(p => p.id.startsWith('blog-'));
  const postsToShow = BlogPosts.slice(0, 3);

  return (
    <section id="blog" className="bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">From Our Blog</h2>
          <p className="mt-4 text-lg text-foreground/80">
            Insights, trends, and stories from the world of technology and development.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {postsToShow.map((post) => {
            const image = blogImages.find(img => img.id === post.imageId);
            return (
              <ShineBorderCard key={post.slug} className="group flex flex-col overflow-hidden">
                {image && (
                  <CardContent className="p-0">
                    <Link href={`/blog/${post.slug}`} className="block aspect-[3/2] overflow-hidden relative rounded-t-lg">
                      <Image
                        src={image.imageUrl}
                        alt={image.description}
                        fill
                        sizes="100vw"
                        className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-110"
                        data-ai-hint={image.imageHint}
                      />
                    </Link>
                  </CardContent>
                )}
                <CardHeader>
                  <div className="flex gap-2 mb-2">
                    {post.tags.map(tag => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                  <CardTitle className="font-headline text-xl leading-snug">
                    <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">{post.title}</Link>
                  </CardTitle>
                   <CardDescription className="text-sm text-foreground/70 pt-1">
                    {post.date} &middot; {post.author}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto">
                   <Button variant="link" asChild className="px-0">
                    <Link href={`/blog/${post.slug}`}>
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </ShineBorderCard>
            );
          })}
        </div>
        <div className="mt-16 text-center">
            <Button size="lg" variant="outline" asChild>
                <Link href="/blog">View All Posts</Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
