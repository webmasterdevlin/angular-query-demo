import { Component, inject } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { DedupeService } from '../services/dedupe.service';

@Component({
  standalone: true,
  imports: [SharedModule],
  template: `<p>sample-b works!</p>`,
  styles: ``,
  selector: 'app-sample-b',
})
export class SampleBComponent {
  #myService = inject(DedupeService);

  commoditiesQuery = injectQuery(() => ({
    queryKey: ['tests'],
    queryFn: () => lastValueFrom(this.#myService.getPosts$()),

    staleTime: 5000,
  }));
}
