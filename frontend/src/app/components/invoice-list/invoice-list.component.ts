import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, switchMap, Subscription } from 'rxjs';
import { InvoiceService, Invoice } from '../../services/invoice.service';

@Component({
  selector: 'app-invoice-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Mis Facturas</h1>
      
      <!-- Barra de búsqueda -->
      <div class="mb-6">
        <input 
          type="text" 
          [(ngModel)]="searchTerm"
          (ngModelChange)="onSearchChange($event)"
          placeholder="Buscar por número de factura o nombre del cliente..."
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      
      <div *ngIf="loading" class="text-center py-8">Cargando facturas...</div>
      
      <div *ngIf="!loading && invoices.length === 0" class="text-center py-8 text-gray-500">
        No se encontraron facturas.
      </div>

      <div *ngIf="!loading && invoices.length > 0" class="bg-white shadow overflow-hidden sm:rounded-md">
        <ul class="divide-y divide-gray-200">
          <li *ngFor="let invoice of invoices" class="px-6 py-4 hover:bg-gray-50">
            <div class="flex items-center justify-between">
              <div class="flex-1">
                <div class="flex items-center">
                  <p class="text-sm font-medium text-indigo-600">#{{ invoice.invoiceNumber }}</p>
                  <p class="ml-4 text-sm text-gray-900">{{ invoice.clientName }}</p>
                </div>
                <div class="mt-2 flex items-center text-sm text-gray-500">
                  <p>{{ invoice.date | date:'dd/MM/yyyy' }}</p>
                  <p class="ml-4" *ngIf="invoice.clientEmail">{{ invoice.clientEmail }}</p>
                </div>
              </div>
              <div class="flex items-center space-x-4">
                <p class="text-sm font-medium text-gray-900">€{{ invoice.total.toFixed(2) }}</p>
                <button (click)="downloadInvoice(invoice)" 
                        class="px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700">
                  Descargar PDF
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <!-- Paginación -->
      <div *ngIf="!loading && totalPages > 1" class="mt-6 flex items-center justify-between">
        <div class="text-sm text-gray-700">
          Mostrando {{ (currentPage - 1) * 10 + 1 }} - {{ Math.min(currentPage * 10, total) }} de {{ total }} facturas
        </div>
        <div class="flex gap-2">
          <button 
            (click)="goToPage(currentPage - 1)"
            [disabled]="currentPage === 1"
            class="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
            Anterior
          </button>
          <span class="px-4 py-2 text-sm text-gray-700">
            Página {{ currentPage }} de {{ totalPages }}
          </span>
          <button 
            (click)="goToPage(currentPage + 1)"
            [disabled]="currentPage === totalPages"
            class="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
            Siguiente
          </button>
        </div>
      </div>
    </div>
  `
})
export class InvoiceListComponent implements OnInit, OnDestroy {
  invoices: Invoice[] = [];
  loading = true;
  currentPage = 1;
  totalPages = 1;
  total = 0;
  searchTerm = '';
  private searchSubject = new Subject<string>();
  private searchSubscription?: Subscription;
  Math = Math;

  constructor(private invoiceService: InvoiceService) {}

  ngOnInit(): void {
    // Configurar debounce para la búsqueda
    this.searchSubscription = this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((search: string) => {
        this.currentPage = 1; // Resetear a la primera página al buscar
        return this.invoiceService.getInvoicesPaginated(1, 10, search);
      })
    ).subscribe({
      next: (result) => {
        this.invoices = result.data;
        this.total = result.total;
        this.currentPage = result.page;
        this.totalPages = result.totalPages;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar facturas:', err);
        this.loading = false;
      }
    });

    // Cargar facturas iniciales
    this.loadInvoices();
  }

  ngOnDestroy(): void {
    this.searchSubscription?.unsubscribe();
  }

  onSearchChange(value: string): void {
    this.loading = true;
    this.searchSubject.next(value);
  }

  loadInvoices(): void {
    this.loading = true;
    this.invoiceService.getInvoicesPaginated(this.currentPage, 10, this.searchTerm).subscribe({
      next: (result) => {
        this.invoices = result.data;
        this.total = result.total;
        this.currentPage = result.page;
        this.totalPages = result.totalPages;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar facturas:', err);
        this.loading = false;
      }
    });
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadInvoices();
    }
  }

  downloadInvoice(invoice: Invoice): void {
    this.invoiceService.generateInvoice(invoice).subscribe({
      next: (blob) => {
        this.invoiceService.downloadPDF(blob, `factura-${invoice.invoiceNumber}.pdf`);
      },
      error: (err) => {
        console.error('Error al generar PDF:', err);
      }
    });
  }
}


