import data from './portfolio-items.json';

export type PortfolioItem = {
  slug: string;
  title: string;
  description: string;
  description_en: string;
  challenge: string;
  challenge_en: string;
  solution: string;
  solution_en: string;
  technologies: string[];
  imageId: string;
  liveUrl?: string;
  githubUrl?: string;
};

export const PortfolioItems: PortfolioItem[] = data.portfolioItems;