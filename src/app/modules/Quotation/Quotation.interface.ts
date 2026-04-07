import { Document, Model } from 'mongoose';

export type PaymentMethod =
  | 'Bank Transfer'
  | 'Mobile Banking'
  | 'Cash'
  | 'Other';
export type QuotationStatus = 'DRAFT' | 'SENT' | 'ACCEPTED' | 'REJECTED';

export interface IQuotation {
  clientName: string;
  clientAddress: string;
  clientEmail?: string;
  clientPhone: string;
  projectName: string;
  description: string;
  deliverables: string;
  startDate?: Date;
  endDate?: Date;
  totalCost: number;
  advancePercentage: number;
  midwayPercentage: number;
  completionPercentage: number;
  paymentMethod: PaymentMethod;
  revisions: number;
  supportDays: number;
  status: QuotationStatus;
  isDeleted: boolean;
}

export type QuotationDocument = IQuotation & Document;
export type QuotationModel = Model<IQuotation>;
