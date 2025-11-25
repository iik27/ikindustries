import data from './blog-posts.json';

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  imageId: string;
  content: string;
};

export const BlogPosts: BlogPost[] = data.blogPosts;
