import data from './portfolio-items.json';

export type PortfolioItem = {
  slug: string;
  title: string;
  description: string;
  challenge: string;
  solution: string;
  technologies: string[];
  imageId: string;
  liveUrl?: string;
  githubUrl?: string;
};

export const PortfolioItems: PortfolioItem[] = data.portfolioItems;
