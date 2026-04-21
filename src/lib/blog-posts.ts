import data from './blog-posts.json';

export type BlogPost = {
  slug: string;
  title: string;
  title_en: string;
  description: string;
  description_en: string;
  date: string;
  author: string;
  tags: string[];
  imageId: string;
  content: string;
  content_en: string;
};

export const BlogPosts: BlogPost[] = data.blogPosts;