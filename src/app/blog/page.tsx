import Image from "next/image";
import Link from "next/link";
import { BlogPosts } from "@/lib/blog-posts";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function BlogListPage() {
  const blogImages = PlaceHolderImages.filter(p => p.id.startsWith('blog-'));

  return (
    <>
      <Header />
      <main>
        <section className="bg-background pt-32 pb-16 sm:pt-40 sm:pb-24">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto">
              <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Our Blog</h1>
              <p className="mt-4 text-xl text-foreground/80">
                Insights, trends, and stories from the world of technology and development.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {BlogPosts.map((post) => {
                const image = blogImages.find(img => img.id === post.imageId);
                return (
                  <Card key={post.slug} className="group flex flex-col overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                    {image && (
                      <CardContent className="p-0">
                        <Link href={`/blog/${post.slug}`} className="block aspect-[3/2] overflow-hidden relative">
                          <Image
                            src={image.imageUrl}
                            alt={image.description}
                            fill
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
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
