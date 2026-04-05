import { Schema, model } from 'mongoose';
import { IPartner } from './Partner.interface';
import { slugPlugin } from '../../utils/slugPlugin';

const partnerSchema = new Schema<IPartner>(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true, index: true },
    logo: { type: String, required: false },
    link: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Apply slug plugin
partnerSchema.plugin(slugPlugin, { sourceField: 'name' });

// Filter out deleted partners by default
partnerSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

partnerSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const Partner = model<IPartner>('Partner', partnerSchema);
