import { Routes } from '@angular/router';
import { PrefetchingComponent } from './pages/prefetching.component';
import { PollingComponent } from './pages/polling.component';
import { PaginationComponent } from './pages/pagination.component';
import { InfiniteScrollComponent } from './pages/infinite-scroll.component';
import { OptimisticUpdateCacheComponent } from './pages/optimistic-update-cache.component';
import { DedupingComponent } from './pages/deduping.component';

export const appRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../app/pages/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'infinite-scroll',
    component: InfiniteScrollComponent,
  },
  {
    path: 'optimistic-update-cache',
    component: OptimisticUpdateCacheComponent,
  },
  {
    path: 'pagination',
    component: PaginationComponent,
  },
  {
    path: 'polling',
    component: PollingComponent,
  },
  {
    path: 'prefetching',
    component: PrefetchingComponent,
  },
  {
    path: 'new-todo',
    loadComponent: () =>
      import('../app/pages/new-todo.component').then((m) => m.NewTodoComponent),
  },
  {
    path: 'deduping',
    component: DedupingComponent,
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
  prefetching: '/prefetching',
  polling: '/polling',
  deduping: '/deduping',
} as const);
