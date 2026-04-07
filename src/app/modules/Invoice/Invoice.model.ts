import { model, Schema } from 'mongoose';
import { IInvoice, InvoiceModel, IInvoiceLineItem } from './Invoice.interface';

const InvoiceLineItemSchema = new Schema<IInvoiceLineItem>({
  description: { type: String, required: true },
  quantity: { type: Number, required: true, default: 1 },
  unitPrice: { type: Number, required: true, default: 0 },
  total: { type: Number, required: true, default: 0 },
});

const invoiceSchema = new Schema<IInvoice, InvoiceModel>(
  {
    quotationId: { type: Schema.Types.ObjectId, ref: 'Quotation' },
    clientName: { type: String, required: true },
    clientEmail: { type: String },
    clientPhone: { type: String, required: true },
    clientAddress: { type: String },
    projectStartTime: { type: Date },
    projectApproximateFinishTime: { type: Date },
    invoiceNumber: { type: String, required: true, unique: true },
    issueDate: { type: Date, required: true },
    dueDate: { type: Date, required: true },
    lineItems: { type: [InvoiceLineItemSchema], required: true },
    subtotal: { type: Number, required: true, default: 0 },
    tax: { type: Number, required: true, default: 0 },
    discount: { type: Number, required: true, default: 0 },
    total: { type: Number, required: true, default: 0 },
    status: {
      type: String,
      enum: ['PENDING', 'PAID', 'OVERDUE', 'CANCELLED'],
      default: 'PENDING',
    },
    notes: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

// Auto-generate invoice number if not provided before save
invoiceSchema.pre('validate', function (next) {
  if (!this.invoiceNumber) {
    this.invoiceNumber = `INV-${Date.now()}`;
  }
  next();
});

export const Invoice = model<IInvoice, InvoiceModel>('Invoice', invoiceSchema);
