import httpStatus from 'http-status-codes';
import AppError from '../../errorHelpers/AppError';
import { IInvoice } from './Invoice.interface';
import { Invoice } from './Invoice.model';
import { QueryBuilder } from '../../utils/QueryBuilder';

const createInvoice = async (payload: IInvoice) => {
  const result = await Invoice.create(payload);
  return result;
};

const getAllInvoices = async (query: Record<string, unknown>) => {
  const invoiceQuery = new QueryBuilder(
    Invoice.find({ isDeleted: { $ne: true } }).populate('quotationId'),
    query,
  )
    .search(['clientName', 'invoiceNumber', 'clientEmail'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await invoiceQuery.modelQuery;
  const meta = await invoiceQuery.countTotal();

  return { result, meta };
};

const getInvoiceById = async (id: string) => {
  const result = await Invoice.findById(id).populate('quotationId');
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invoice not found');
  }
  return result;
};

const updateInvoice = async (id: string, payload: Partial<IInvoice>) => {
  const result = await Invoice.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteInvoice = async (id: string) => {
  const result = await Invoice.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const InvoiceService = {
  createInvoice,
  getAllInvoices,
  getInvoiceById,
  updateInvoice,
  deleteInvoice,
};
