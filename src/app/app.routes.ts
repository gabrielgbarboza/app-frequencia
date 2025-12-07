import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'turmas',
    loadComponent: () =>
      import('./turmas/turmas.page').then((m) => m.TurmasPage),
  },
  {
    path: 'chamada/:id',
    loadComponent: () =>
      import('./chamada/chamada.page').then((m) => m.ChamadaPage),
  },
];
