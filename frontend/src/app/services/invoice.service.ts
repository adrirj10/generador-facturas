import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:3000/api';

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  tax: number;
  total: number;
}

export interface Invoice {
  id?: string;
  invoiceNumber: string;
  emitterName?: string;
  emitterCif?: string;
  emitterAddress?: string;
  emitterPhone?: string;
  emitterEmail?: string;
  emitterLogo?: string;
  clientName: string;
  clientCif?: string;
  clientAddress?: string;
  clientPhone?: string;
  clientEmail?: string;
  date: string;
  subtotal: number;
  tax: number;
  total: number;
  notes?: string;
  items: InvoiceItem[];
}

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  constructor(private http: HttpClient) {}

  generateInvoice(invoice: Invoice): Observable<Blob> {
    return this.http.post(`${API_URL}/invoice/generate`, invoice, {
      responseType: 'blob'
    });
  }

  saveInvoice(invoice: Invoice): Observable<Invoice> {
    return this.http.post<Invoice>(`${API_URL}/invoice/save`, invoice);
  }

  getMyInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${API_URL}/invoice/my`);
  }

  getInvoicesPaginated(page: number = 1, limit: number = 10, search: string = ''): Observable<{
    data: Invoice[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    
    if (search && search.trim() !== '') {
      params = params.set('search', search.trim());
    }
    
    return this.http.get<{
      data: Invoice[];
      total: number;
      page: number;
      totalPages: number;
    }>(`${API_URL}/invoice/invoices`, { params });
  }

  downloadPDF(blob: Blob, filename: string): void {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }
}

