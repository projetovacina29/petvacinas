import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'vacinas',
    pathMatch: 'full'
  },
  {
    path: 'vacinas',
    loadComponent: () =>
      import('./pages/vacinas/vacinas').then(m => m.Vacinas)
  }
];