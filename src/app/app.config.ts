import { provideHttpClient, withFetch } from '@angular/common/http';
import {
  QueryClient,
  provideTanStackQuery,
  withDevtools,
} from '@tanstack/angular-query-experimental';
import type { ApplicationConfig } from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideHttpClient(withFetch()),
    provideTanStackQuery(
      new QueryClient({
        defaultOptions: {
          queries: {
            // gcTime means garbage collection time and it is set to 24 hours
            gcTime: 1000 * 60 * 60 * 24,
          },
        },
      }),
      withDevtools(() => ({ loadDevtools: 'auto' })),
    ),
  ],
};
