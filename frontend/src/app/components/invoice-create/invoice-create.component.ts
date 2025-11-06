import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InvoiceService, Invoice, InvoiceItem } from '../../services/invoice.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-invoice-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Crear Factura</h1>
      
      <form (ngSubmit)="onSubmit()" class="bg-white shadow-md rounded-lg p-6 space-y-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Número de Factura</label>
            <input type="text" [(ngModel)]="invoice.invoiceNumber" name="invoiceNumber" required
                   class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Fecha</label>
            <input type="date" [(ngModel)]="invoice.date" name="date" required
                   class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
          </div>
        </div>

        <div class="border-t pt-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Tus Datos</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
              <input type="text" [(ngModel)]="invoice.emitterName" name="emitterName"
                     class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">CIF</label>
              <input type="text" [(ngModel)]="invoice.emitterCif" name="emitterCif"
                     class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Dirección</label>
              <input type="text" [(ngModel)]="invoice.emitterAddress" name="emitterAddress"
                     class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
              <input type="tel" [(ngModel)]="invoice.emitterPhone" name="emitterPhone"
                     class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input type="email" [(ngModel)]="invoice.emitterEmail" name="emitterEmail"
                     class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Logo (URL)</label>
              <input type="url" [(ngModel)]="invoice.emitterLogo" name="emitterLogo"
                     class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
            </div>
          </div>
        </div>

        <div class="border-t pt-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Datos del Cliente</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Nombre <span class="text-red-500">*</span></label>
              <input type="text" [(ngModel)]="invoice.clientName" name="clientName" required
                     class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">CIF</label>
              <input type="text" [(ngModel)]="invoice.clientCif" name="clientCif"
                     class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Dirección</label>
              <input type="text" [(ngModel)]="invoice.clientAddress" name="clientAddress"
                     class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
              <input type="tel" [(ngModel)]="invoice.clientPhone" name="clientPhone"
                     class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input type="email" [(ngModel)]="invoice.clientEmail" name="clientEmail"
                     class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
            </div>
          </div>
        </div>

        <div class="border-t pt-6">
          <div class="flex justify-between items-center mb-4">
            <label class="block text-sm font-medium text-gray-700">Items</label>
            <button type="button" (click)="addItem()" 
                    class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
              Agregar Item
            </button>
          </div>
          
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-md">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
                  <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
                  <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Precio Unitario</th>
                  <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Impuestos (%)</th>
                  <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Acción</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr *ngFor="let item of invoice.items; let i = index">
                  <td class="px-4 py-3">
                    <input type="text" [(ngModel)]="item.description" 
                           [name]="'description_' + i" placeholder="Descripción" required
                           class="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                  </td>
                  <td class="px-4 py-3">
                    <input type="number" [(ngModel)]="item.quantity" 
                           [name]="'quantity_' + i" placeholder="Cantidad" min="0" step="0.01" required
                           (ngModelChange)="calculateItemTotal(i)"
                           class="w-full px-2 py-1 border border-gray-300 rounded-md text-right focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                  </td>
                  <td class="px-4 py-3">
                    <input type="number" [(ngModel)]="item.unitPrice" 
                           [name]="'unitPrice_' + i" placeholder="Precio Unit." min="0" step="0.01" required
                           (ngModelChange)="calculateItemTotal(i)"
                           class="w-full px-2 py-1 border border-gray-300 rounded-md text-right focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                  </td>
                  <td class="px-4 py-3">
                    <input type="number" [(ngModel)]="item.tax" 
                           [name]="'tax_' + i" placeholder="Impuestos" min="0" step="0.01"
                           (ngModelChange)="calculateItemTotal(i)"
                           class="w-full px-2 py-1 border border-gray-300 rounded-md text-right focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                  </td>
                  <td class="px-4 py-3">
                    <input type="number" [(ngModel)]="item.total" 
                           [name]="'total_' + i" placeholder="Total" readonly
                           class="w-full px-2 py-1 border border-gray-300 rounded-md bg-gray-50 text-right">
                  </td>
                  <td class="px-4 py-3 text-center">
                    <button type="button" (click)="removeItem(i)" 
                            class="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700">
                      ×
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Notas</label>
          <textarea [(ngModel)]="invoice.notes" name="notes" rows="3"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"></textarea>
        </div>

        <div class="bg-gray-50 p-4 rounded-md">
          <div class="flex justify-between mb-2">
            <span class="font-medium">Subtotal:</span>
            <span>€{{ invoice.subtotal.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between mb-2">
            <span class="font-medium">Impuestos Totales:</span>
            <span>€{{ totalTaxAmount.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between text-lg font-bold border-t pt-2">
            <span>Total:</span>
            <span>€{{ invoice.total.toFixed(2) }}</span>
          </div>
        </div>

        <div *ngIf="error" class="text-red-600 text-sm">{{ error }}</div>
        <div *ngIf="success" class="text-green-600 text-sm">{{ success }}</div>

        <div class="flex gap-4">
          <button type="submit" [disabled]="loading || invoice.items.length === 0"
                  class="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50">
            {{ loading ? 'Generando...' : 'Generar PDF' }}
          </button>
          <button type="button" (click)="saveInvoice()" 
                  [disabled]="loading || !isAuthenticated() || invoice.items.length === 0"
                  class="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50">
            Guardar Factura
          </button>
        </div>
      </form>
    </div>
  `
})
export class InvoiceCreateComponent {
  invoice: Invoice = {
    invoiceNumber: '',
    emitterName: '',
    emitterCif: '',
    emitterAddress: '',
    emitterPhone: '',
    emitterEmail: '',
    emitterLogo: '',
    clientName: '',
    clientCif: '',
    clientAddress: '',
    clientPhone: '',
    clientEmail: '',
    date: new Date().toISOString().split('T')[0],
    subtotal: 0,
    tax: 0,
    total: 0,
    notes: '',
    items: []
  };

  error = '';
  success = '';
  loading = false;

  constructor(
    private invoiceService: InvoiceService,
    private authService: AuthService
  ) {}

  get totalTaxAmount(): number {
    return this.invoice.items.reduce((sum, item) => {
      const itemTax = (item.quantity * item.unitPrice * item.tax) / 100;
      return sum + itemTax;
    }, 0);
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  addItem(): void {
    this.invoice.items.push({
      description: '',
      quantity: 1,
      unitPrice: 0,
      tax: 0,
      total: 0
    });
  }

  removeItem(index: number): void {
    this.invoice.items.splice(index, 1);
    this.calculateTotals();
  }

  calculateItemTotal(index: number): void {
    const item = this.invoice.items[index];
    const subtotal = item.quantity * item.unitPrice;
    const taxAmount = (subtotal * item.tax) / 100;
    item.total = subtotal + taxAmount;
    this.calculateTotals();
  }

  calculateTotals(): void {
    this.invoice.subtotal = this.invoice.items.reduce((sum, item) => {
      const subtotal = item.quantity * item.unitPrice;
      return sum + subtotal;
    }, 0);
    this.invoice.total = this.invoice.subtotal + this.totalTaxAmount;
  }

  onSubmit(): void {
    if (this.invoice.items.length === 0) {
      this.error = 'Debe agregar al menos un item';
      return;
    }

    this.error = '';
    this.success = '';
    this.loading = true;

    this.calculateTotals();

    this.invoiceService.generateInvoice(this.invoice).subscribe({
      next: (blob) => {
        this.invoiceService.downloadPDF(blob, `factura-${this.invoice.invoiceNumber}.pdf`);
        this.success = 'PDF generado y descargado correctamente';
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.error || 'Error al generar el PDF';
        this.loading = false;
      }
    });
  }

  saveInvoice(): void {
    if (!this.isAuthenticated()) {
      this.error = 'Debe iniciar sesión para guardar facturas';
      return;
    }

    if (this.invoice.items.length === 0) {
      this.error = 'Debe agregar al menos un item';
      return;
    }

    this.error = '';
    this.success = '';
    this.loading = true;

    this.calculateTotals();

    this.invoiceService.saveInvoice(this.invoice).subscribe({
      next: () => {
        this.success = 'Factura guardada correctamente';
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.error || 'Error al guardar la factura';
        this.loading = false;
      }
    });
  }
}
