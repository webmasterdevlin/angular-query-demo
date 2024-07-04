import { Routes } from '@angular/router';

export const appRoutes: Routes = [
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
