import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home').then(m => m.Home)
  },
  {
    path: 'pets',
    loadComponent: () =>
      import('./pages/pets/pets').then(m => m.Pets)
  },
  {
    path: 'vacinas',
    loadComponent: () =>
      import('./pages/vacinas/vacinas').then(m => m.Vacinas)
  },

{
  path: 'aplicacoes',
  loadComponent: () =>
    import('./pages/aplicacoes/aplicacoes').then(m => m.Aplicacoes)
},

  {
    path: '**',
    redirectTo: ''
  }
];
import { RouterLink } from '@angular/router';