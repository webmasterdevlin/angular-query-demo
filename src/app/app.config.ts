import { provideHttpClient, withFetch } from '@angular/common/http';
import {
  QueryClient,
  provideAngularQuery,
} from '@tanstack/angular-query-experimental';
import type { ApplicationConfig } from '@angular/core';
import { MovieService } from './services/movie.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    { provide: MovieService, useClass: MovieService },
    provideAngularQuery(
      new QueryClient({
        defaultOptions: {
          queries: {
            gcTime: 1000 * 60 * 60 * 24, // 24 hours
          },
        },
      }),
    ),
  ],
};
