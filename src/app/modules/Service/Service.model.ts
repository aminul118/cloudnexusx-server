import { Schema, model } from 'mongoose';
import { IService, ServiceModel } from './Service.interface';
import { slugPlugin } from '../../utils/slugPlugin';

const serviceSchema = new Schema<IService, ServiceModel>(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true, index: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    icon: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Apply slug plugin to automatically handle slugs
serviceSchema.plugin(slugPlugin, { sourceField: 'title' });

// Query middleware to exclude deleted documents
serviceSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

serviceSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const Service = model<IService, ServiceModel>('Service', serviceSchema);
