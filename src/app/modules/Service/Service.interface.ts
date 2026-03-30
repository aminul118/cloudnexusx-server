import { Model } from 'mongoose';

export interface IService {
  title: string;
  slug: string;
  description: string;
  content: string;
  image: string;
  icon: string;
  isDeleted: boolean;
}

export type ServiceModel = Model<IService, Record<string, never>>;
