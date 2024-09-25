import { Routes } from '@angular/router';
import { PrefetchingComponent } from './pages/prefetching.component';
import { PollingComponent } from './pages/polling.component';
import { PaginationComponent } from './pages/pagination.component';
import { InfiniteScrollComponent } from './pages/infinite-scroll.component';
import { OptimisticUpdateCacheComponent } from './pages/optimistic-update-cache.component';
import { HomeComponent } from './pages/home.component';
import { NewTodoComponent } from './pages/new-todo.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
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
    component: NewTodoComponent,
  },
  {
    path: 'deduping',
    loadComponent: () =>
      import('../app/pages/deduping.component').then(
        (m) => m.DedupingComponent,
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

export const pathNames = Object.entries({
  home: '/',
  prefetching: '/prefetching',
  deduping: '/deduping',
  'optimistic update cache': '/optimistic-update-cache',
  polling: '/polling',
  pagination: '/pagination',
  'infinite scroll': '/infinite-scroll',
} as const);
