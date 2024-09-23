import { Component, inject } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { DedupeService } from '../services/dedupe.service';
import { SampleAComponent } from '../components/sample-a.component';
import { SampleBComponent } from '../components/sample-b.component';

@Component({
  standalone: true,
  imports: [SharedModule, SampleAComponent, SampleBComponent],
  template: `<p>deduping works!</p>
    <app-sample-a></app-sample-a>
    <app-sample-b></app-sample-b> `,
  styles: ``,
})
export class DedupingComponent {
  #myService = inject(DedupeService);

  // commoditiesQuery = injectQuery(() => ({
  //   queryKey: ['tests'],
  //   queryFn: () => lastValueFrom(this.#myService.getPosts$()),

  //   staleTime: 5000,
  // }));
}
