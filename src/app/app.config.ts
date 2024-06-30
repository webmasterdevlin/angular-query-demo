import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAngularQuery } from '@tanstack/angular-query-experimental';
import { QueryClient } from '@tanstack/angular-query-experimental';
import { provideHttpClient } from '@angular/common/http';
import { LocalStorageService } from './utilities/local-storage.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideAngularQuery(new QueryClient()),
    provideHttpClient(),
    { provide: LocalStorageService, useClass: LocalStorageService },
  ],
};
