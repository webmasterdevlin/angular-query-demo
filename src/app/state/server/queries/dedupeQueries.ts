import { inject } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { DedupeService } from 'src/app/services/dedupe.service';
import { names } from '../queryKey';

export function injectDedupeQuery() {
  const myService = inject(DedupeService);

  return injectQuery(() => ({
    queryKey: [names.posts],
    queryFn: () => lastValueFrom(myService.getPosts$()),
    staleTime: 5000,
  }));
}
