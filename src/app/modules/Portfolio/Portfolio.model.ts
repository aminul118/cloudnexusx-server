import { Schema, model } from 'mongoose';
import slugify from 'slugify';
import { IPortfolio } from './Portfolio.interface';

const portfolioSchema = new Schema<IPortfolio>(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    link: { type: String },
    technologies: [{ type: String }],
    isFeatured: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

portfolioSchema.pre('save', function (next) {
  if (this.isModified('title') || this.isNew) {
    this.slug = slugify(this.title, {
      lower: true,
      trim: true,
      strict: false, // Allow unicode characters for Bangla support
    });
  }
  next();
});

portfolioSchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate() as Record<string, unknown>;
  if (update && update.title) {
    update.slug = slugify(update.title as string, {
      lower: true,
      trim: true,
      strict: false,
    });
  }
  next();
});

export const Portfolio = model<IPortfolio>('Portfolio', portfolioSchema);
