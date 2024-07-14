import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../app/pages/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'infinite-scroll',
    loadComponent: () =>
      import('../app/pages/infinite-scroll.component').then(
        (m) => m.InfiniteScrollComponent,
      ),
  },
  {
    path: 'optimistic-update-cache',
    loadComponent: () =>
      import('../app/pages/optimistic-update-cache.component').then(
        (m) => m.OptimisticUpdateCacheComponent,
      ),
  },
  {
    path: 'pagination',
    loadComponent: () =>
      import('../app/pages/pagination.component').then(
        (m) => m.PaginationComponent,
      ),
  },
  {
    path: 'polling',
    loadComponent: () =>
      import('../app/pages/polling.component').then((m) => m.PollingComponent),
  },
  {
    path: 'prefetching',
    loadComponent: () =>
      import('../app/pages/prefetching.component').then(
        (m) => m.PrefetchingComponent,
      ),
  },
  {
    path: 'new-todo',
    loadComponent: () =>
      import('../app/pages/new-todo.component').then((m) => m.NewTodoComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

export const pathNames = Object.entries({
  home: '/',
  'optimistic update cache': '/optimistic-update-cache',
  'infinite scroll': '/infinite-scroll',
  pagination: '/pagination',
  polling: '/polling',
  prefetching: '/prefetching',
  'new todo': '/new-todo',
} as const);
