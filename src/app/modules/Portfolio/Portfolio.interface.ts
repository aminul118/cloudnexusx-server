export interface IPortfolio {
  title: string;
  slug: string;
  description: string;
  image: string;
  link?: string;
  technologies: string[];
  isFeatured: boolean;
  isDeleted: boolean;
}
