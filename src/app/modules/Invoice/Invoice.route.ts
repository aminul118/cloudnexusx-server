import express from 'express';
import { InvoiceController } from './Invoice.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post('/', auth('ADMIN', 'SUPER_ADMIN'), InvoiceController.createInvoice);

router.get('/', auth('ADMIN', 'SUPER_ADMIN'), InvoiceController.getAllInvoices);

router.get('/:id', auth('ADMIN', 'SUPER_ADMIN'), InvoiceController.getInvoiceById);

router.patch('/:id', auth('ADMIN', 'SUPER_ADMIN'), InvoiceController.updateInvoice);

router.delete('/:id', auth('ADMIN', 'SUPER_ADMIN'), InvoiceController.deleteInvoice);

export const InvoiceRoutes = router;
