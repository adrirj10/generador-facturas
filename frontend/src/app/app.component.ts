import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  template: `
    <div class="min-h-screen gradient-bg">
      <nav class="bg-white shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16 items-center">
            <div class="text-xl font-bold text-gray-900">Generador de Facturas</div>
            <div class="flex gap-4">
              <a routerLink="/login" class="text-gray-700 hover:text-gray-900" *ngIf="!isAuthenticated()">Login</a>
              <a routerLink="/register" class="text-gray-700 hover:text-gray-900" *ngIf="!isAuthenticated()">Registro</a>
              <a routerLink="/invoice/create" class="text-blue-600 hover:text-blue-800">Crear Factura</a>
              <a routerLink="/invoice/list" class="text-gray-700 hover:text-gray-900" *ngIf="isAuthenticated()">Mis Facturas</a>
              <button (click)="logout()" class="text-red-600 hover:text-red-800" *ngIf="isAuthenticated()">Salir</button>
            </div>
          </div>
        </div>
      </nav>
      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
  `
})
export class AppComponent {
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }
}

