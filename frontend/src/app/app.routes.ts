import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/invoice/create', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent) },
  { path: 'invoice/create', loadComponent: () => import('./components/invoice-create/invoice-create.component').then(m => m.InvoiceCreateComponent) },
  { path: 'invoice/list', loadComponent: () => import('./components/invoice-list/invoice-list.component').then(m => m.InvoiceListComponent), canActivate: [authGuard] }
];


