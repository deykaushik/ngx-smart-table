import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'table-demo',
    pathMatch: 'full',
  },
  {
    path: 'table-demo',
    loadComponent: () =>
      import('./table-demo/table-demo.component').then(
        (c) => c.TableDemoComponent
      ),
  },
];
