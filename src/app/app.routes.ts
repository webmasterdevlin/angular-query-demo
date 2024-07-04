import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'contacts/:id',
    loadComponent: () =>
      import('./pages/contacts/contactid/contact-id.component').then(
        (m) => m.ContactIdComponent,
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
