import express from 'express';
import * as invoiceController from '../controllers/invoiceController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/generate', invoiceController.generateInvoice);
router.post('/save', authenticateToken, invoiceController.saveInvoice);
router.get('/my', authenticateToken, invoiceController.getMyInvoices);
router.get('/invoices', authenticateToken, invoiceController.getInvoices);

export default router;


