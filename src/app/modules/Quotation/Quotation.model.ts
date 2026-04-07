import { model, Schema } from 'mongoose';
import { IQuotation, QuotationModel } from './Quotation.interface';

const quotationSchema = new Schema<IQuotation, QuotationModel>(
  {
    clientName: { type: String, required: true },
    clientAddress: { type: String, required: true },
    clientEmail: { type: String },
    clientPhone: { type: String },
    projectName: { type: String, required: true },
    description: { type: String, required: true },
    deliverables: { type: String, required: true },
    startDate: { type: Date },
    endDate: { type: Date },
    totalCost: { type: Number, required: true },
    advancePercentage: { type: Number, default: 50 },
    midwayPercentage: { type: Number, default: 0 },
    completionPercentage: { type: Number, default: 50 },
    paymentMethod: {
      type: String,
      enum: ['Bank Transfer', 'Mobile Banking', 'Cash', 'Other'],
      default: 'Bank Transfer',
    },
    revisions: { type: Number, default: 3 },
    supportDays: { type: Number, default: 30 },
    status: {
      type: String,
      enum: ['DRAFT', 'SENT', 'ACCEPTED', 'REJECTED'],
      default: 'DRAFT',
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

export const Quotation = model<IQuotation, QuotationModel>(
  'Quotation',
  quotationSchema,
);
