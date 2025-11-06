import * as invoiceService from '../services/invoiceService.js';

export const generateInvoice = async (req, res) => {
  try {
    const invoiceData = req.body;

    if (!invoiceData.invoiceNumber || !invoiceData.clientName || !invoiceData.items || !Array.isArray(invoiceData.items)) {
      return res.status(400).json({ error: 'Datos de factura incompletos' });
    }

    const subtotal = invoiceData.items.reduce((sum, item) => {
      return sum + (item.quantity * item.unitPrice);
    }, 0);
    
    const totalTaxAmount = invoiceData.items.reduce((sum, item) => {
      const itemSubtotal = item.quantity * item.unitPrice;
      const itemTaxAmount = (itemSubtotal * (item.tax || 0)) / 100;
      return sum + itemTaxAmount;
    }, 0);
    
    const total = subtotal + totalTaxAmount;

    const completeInvoiceData = {
      ...invoiceData,
      subtotal,
      tax: totalTaxAmount,
      total,
      date: invoiceData.date || new Date()
    };

    const pdfBuffer = await invoiceService.generateInvoicePDF(completeInvoiceData);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="factura-${invoiceData.invoiceNumber}.pdf"`);
    res.send(pdfBuffer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const saveInvoice = async (req, res) => {
  try {
    const invoiceData = req.body;
    const userId = req.user.userId;

    if (!invoiceData.invoiceNumber || !invoiceData.clientName || !invoiceData.items || !Array.isArray(invoiceData.items)) {
      return res.status(400).json({ error: 'Datos de factura incompletos' });
    }

    const subtotal = invoiceData.items.reduce((sum, item) => {
      return sum + (item.quantity * item.unitPrice);
    }, 0);
    
    const totalTaxAmount = invoiceData.items.reduce((sum, item) => {
      const itemSubtotal = item.quantity * item.unitPrice;
      const itemTaxAmount = (itemSubtotal * (item.tax || 0)) / 100;
      return sum + itemTaxAmount;
    }, 0);
    
    const total = subtotal + totalTaxAmount;

    const completeInvoiceData = {
      ...invoiceData,
      subtotal,
      tax: totalTaxAmount,
      total,
      date: invoiceData.date || new Date()
    };

    const invoice = await invoiceService.saveInvoice(completeInvoiceData, userId);
    res.status(201).json(invoice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMyInvoices = async (req, res) => {
  try {
    const userId = req.user.userId;
    const invoices = await invoiceService.getUserInvoices(userId);
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getInvoices = async (req, res) => {
  try {
    const userId = req.user.userId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';

    if (page < 1) {
      return res.status(400).json({ error: 'La página debe ser mayor a 0' });
    }

    if (limit < 1 || limit > 100) {
      return res.status(400).json({ error: 'El límite debe estar entre 1 y 100' });
    }

    const result = await invoiceService.getInvoicesPaginated(userId, page, limit, search);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

