import { PrismaClient } from '@prisma/client';
import PDFDocument from 'pdfkit';

const prisma = new PrismaClient();

export const generateInvoicePDF = (invoiceData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const chunks = [];

      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      let currentY = 50;
      const pageWidth = doc.page.width;
      const rightMargin = pageWidth - 50;

      let logoY = currentY;
      let invoiceInfoY = currentY;

      if (invoiceData.emitterLogo) {
        try {
          const response = await fetch(invoiceData.emitterLogo);
          if (response.ok) {
            const arrayBuffer = await response.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            doc.image(buffer, rightMargin - 80, logoY, { width: 80, height: 80, fit: [80, 80] });
          }
        } catch (error) {
          console.warn('No se pudo cargar el logo:', error);
        }
      }

      doc.fontSize(20).font('Helvetica-Bold');
      doc.text('FACTURA', 50, invoiceInfoY);
      invoiceInfoY += 25;

      doc.fontSize(12).font('Helvetica');
      doc.text(`Número de Factura: ${invoiceData.invoiceNumber}`, 50, invoiceInfoY);
      invoiceInfoY += 15;
      doc.text(`Fecha: ${new Date(invoiceData.date).toLocaleDateString('es-ES')}`, 50, invoiceInfoY);

      currentY = Math.max(logoY + 90, invoiceInfoY + 20);

      const emitterStartY = currentY;
      const clientStartY = currentY;
      let emitterY = emitterStartY;
      let clientY = clientStartY;

      if (invoiceData.emitterName || invoiceData.emitterEmail || invoiceData.emitterAddress) {
        doc.fontSize(12).font('Helvetica-Bold');
        doc.text('Datos del Emisor', 50, emitterY);
        emitterY += 15;
        doc.font('Helvetica');
        doc.fontSize(10);
        
        if (invoiceData.emitterName) {
          doc.text(invoiceData.emitterName, 50, emitterY);
          emitterY += 12;
        }
        if (invoiceData.emitterCif) {
          doc.text(`CIF: ${invoiceData.emitterCif}`, 50, emitterY);
          emitterY += 12;
        }
        if (invoiceData.emitterAddress) {
          doc.text(invoiceData.emitterAddress, 50, emitterY);
          emitterY += 12;
        }
        if (invoiceData.emitterPhone) {
          doc.text(`Teléfono: ${invoiceData.emitterPhone}`, 50, emitterY);
          emitterY += 12;
        }
        if (invoiceData.emitterEmail) {
          doc.text(`Email: ${invoiceData.emitterEmail}`, 50, emitterY);
          emitterY += 12;
        }
      }

      if (invoiceData.clientName || invoiceData.clientCif || invoiceData.clientAddress) {
        doc.fontSize(12).font('Helvetica-Bold');
        doc.text('Datos del Cliente', rightMargin - 200, clientStartY, { width: 200, align: 'right' });
        clientY = clientStartY + 15;
        doc.font('Helvetica');
        doc.fontSize(10);
        
        if (invoiceData.clientName) {
          doc.text(invoiceData.clientName, rightMargin - 200, clientY, { width: 200, align: 'right' });
          clientY += 12;
        }
        if (invoiceData.clientCif) {
          doc.text(`CIF: ${invoiceData.clientCif}`, rightMargin - 200, clientY, { width: 200, align: 'right' });
          clientY += 12;
        }
        if (invoiceData.clientAddress) {
          doc.text(invoiceData.clientAddress, rightMargin - 200, clientY, { width: 200, align: 'right' });
          clientY += 12;
        }
        if (invoiceData.clientPhone) {
          doc.text(`Teléfono: ${invoiceData.clientPhone}`, rightMargin - 200, clientY, { width: 200, align: 'right' });
          clientY += 12;
        }
        if (invoiceData.clientEmail) {
          doc.text(`Email: ${invoiceData.clientEmail}`, rightMargin - 200, clientY, { width: 200, align: 'right' });
          clientY += 12;
        }
      }

      currentY = Math.max(emitterY, clientY) + 20;

      doc.fontSize(12).font('Helvetica-Bold');
      doc.text('Items:', 50, currentY);
      currentY += 20;

      const tableTop = currentY;
      let tableY = tableTop;
      const tableLeft = 50;
      const tableRight = 510;
      const rowHeight = 20;

      const headerBgY = tableY;
      const headerHeight = 25;

      doc.rect(tableLeft, headerBgY, tableRight - tableLeft, headerHeight)
         .fillAndStroke('#4a5568', '#4a5568');

      doc.fontSize(10).font('Helvetica-Bold');
      doc.fillColor('#ffffff');
      doc.text('Descripción', tableLeft + 5, headerBgY + 8, { width: 180 });
      doc.text('Cantidad', 230, headerBgY + 8, { width: 60, align: 'right' });
      doc.text('Precio Unit.', 290, headerBgY + 8, { width: 70, align: 'right' });
      doc.text('Impuestos', 360, headerBgY + 8, { width: 60, align: 'right' });
      doc.text('Total', 450, headerBgY + 8, { width: 50, align: 'right' });

      doc.fillColor('#000000');
      tableY = headerBgY + headerHeight;

      doc.font('Helvetica');
      doc.fontSize(10);
      
      invoiceData.items.forEach((item, index) => {
        const isEven = index % 2 === 0;
        const rowBgY = tableY;

        const itemSubtotal = item.quantity * item.unitPrice;
        const itemTaxAmount = (itemSubtotal * item.tax) / 100;
        const itemTotal = itemSubtotal + itemTaxAmount;

        const descriptionText = item.description || '';
        const descriptionHeight = doc.heightOfString(descriptionText, {
          width: 180,
          align: 'left'
        });

        const dynamicRowHeight = Math.max(20, descriptionHeight + 10);

        if (!isEven) {
          doc.rect(tableLeft, rowBgY, tableRight - tableLeft, dynamicRowHeight)
             .fillColor('#f7fafc')
             .fill()
             .fillColor('#000000');
        }

        const textY = rowBgY + 5;

        doc.text(descriptionText, tableLeft + 5, textY, { width: 180 });
        doc.text(item.quantity.toString(), 230, textY, { width: 60, align: 'right' });
        doc.text(`€${item.unitPrice.toFixed(2)}`, 290, textY, { width: 70, align: 'right' });
        doc.text(`${item.tax.toFixed(2)}%`, 360, textY, { width: 60, align: 'right' });
        doc.text(`€${itemTotal.toFixed(2)}`, 450, textY, { width: 50, align: 'right' });

        doc.moveTo(tableLeft, rowBgY + dynamicRowHeight)
           .lineTo(tableRight, rowBgY + dynamicRowHeight)
           .strokeColor('#e2e8f0')
           .stroke();

        tableY += dynamicRowHeight;
      });

      tableY += 40;

      const totalTaxAmount = invoiceData.items.reduce((sum, item) => {
        const itemSubtotal = item.quantity * item.unitPrice;
        const itemTaxAmount = (itemSubtotal * item.tax) / 100;
        return sum + itemTaxAmount;
      }, 0);

      const startY = tableY;
      const spacing = 30;

      doc.fontSize(12).font('Helvetica');
      
      const subtotalY = startY;
      doc.text(`Subtotal: €${invoiceData.subtotal.toFixed(2)}`, tableRight - 200, subtotalY, { width: 180, align: 'right' });
      
      const taxesY = subtotalY + spacing;
      doc.text(`Impuestos Totales: €${totalTaxAmount.toFixed(2)}`, tableRight - 200, taxesY, { width: 180, align: 'right' });
      
      const totalY = taxesY + spacing;
      doc.fontSize(14).font('Helvetica-Bold');
      doc.text(`Total: €${invoiceData.total.toFixed(2)}`, tableRight - 200, totalY, { width: 180, align: 'right', underline: true });
      
      tableY = totalY + spacing;

      if (invoiceData.notes) {
        tableY += 30;
        doc.fontSize(10).font('Helvetica');
        doc.text('Notas:', 50, tableY, { underline: true });
        tableY += 15;
        doc.text(invoiceData.notes, 50, tableY, { width: 440 });
      }

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};

export const saveInvoice = async (invoiceData, userId) => {
  const invoice = await prisma.invoice.create({
    data: {
      invoiceNumber: invoiceData.invoiceNumber,
      emitterName: invoiceData.emitterName || null,
      emitterCif: invoiceData.emitterCif || null,
      emitterAddress: invoiceData.emitterAddress || null,
      emitterPhone: invoiceData.emitterPhone || null,
      emitterEmail: invoiceData.emitterEmail || null,
      emitterLogo: invoiceData.emitterLogo || null,
      clientName: invoiceData.clientName,
      clientCif: invoiceData.clientCif || null,
      clientAddress: invoiceData.clientAddress || null,
      clientPhone: invoiceData.clientPhone || null,
      clientEmail: invoiceData.clientEmail || null,
      date: invoiceData.date ? new Date(invoiceData.date) : new Date(),
      subtotal: invoiceData.subtotal,
      tax: invoiceData.tax || 0,
      total: invoiceData.total,
      notes: invoiceData.notes || null,
      userId,
      items: {
        create: invoiceData.items.map(item => ({
          description: item.description,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          tax: item.tax || 0,
          total: item.total
        }))
      }
    },
    include: {
      items: true
    }
  });

  return invoice;
};

export const getUserInvoices = async (userId) => {
  const invoices = await prisma.invoice.findMany({
    where: { userId },
    include: {
      items: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return invoices;
};

export const getInvoicesPaginated = async (userId, page = 1, limit = 10, search = '') => {
  const skip = (page - 1) * limit;
  
  // Construir el filtro de búsqueda
  const where = {
    userId
  };

  if (search && search.trim() !== '') {
    where.OR = [
      {
        invoiceNumber: {
          contains: search,
          mode: 'insensitive'
        }
      },
      {
        clientName: {
          contains: search,
          mode: 'insensitive'
        }
      }
    ];
  }

  // Obtener el total de facturas que coinciden con el filtro
  const total = await prisma.invoice.count({ where });

  // Obtener las facturas paginadas
  const invoices = await prisma.invoice.findMany({
    where,
    include: {
      items: true
    },
    orderBy: {
      createdAt: 'desc'
    },
    skip,
    take: limit
  });

  const totalPages = Math.ceil(total / limit);

  return {
    data: invoices,
    total,
    page,
    totalPages
  };
};
