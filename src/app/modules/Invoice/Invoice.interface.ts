import { Document, Model, Types } from 'mongoose';

export type InvoiceStatus = 'PENDING' | 'PAID' | 'OVERDUE' | 'CANCELLED';

export interface IInvoiceLineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface IInvoice {
  quotationId?: Types.ObjectId;
  clientName: string;
  clientEmail?: string;
  clientPhone: string;
  clientAddress?: string;
  projectStartTime?: Date;
  projectApproximateFinishTime?: Date;
  invoiceNumber: string;
  issueDate: Date;
  dueDate: Date;
  lineItems: IInvoiceLineItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  status: InvoiceStatus;
  notes?: string;
  isDeleted: boolean;
}

export type InvoiceDocument = IInvoice & Document;
export type InvoiceModel = Model<IInvoice>;
