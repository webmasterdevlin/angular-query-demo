import { Component, inject } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { DedupeService } from '../services/dedupe.service';
import { SampleAComponent } from '../components/sample-a.component';
import { SampleBComponent } from '../components/sample-b.component';
import { SpinnerComponent } from '../components/spinner.component';

@Component({
  standalone: true,
  imports: [SharedModule, SampleAComponent, SampleBComponent, SpinnerComponent],
  template: `
    <h1>Deduping Page @if (myQuery.isFetching()) {
      <app-spinner></app-spinner>
    }
    </h1>
    <app-sample-a></app-sample-a>
    <app-sample-b></app-sample-b>`,
  styles: ``,
})
export class DedupingComponent {
  #myService = inject(DedupeService);

  myQuery = injectQuery(() => ({
    queryKey: ['tests'],
    queryFn: () => lastValueFrom(this.#myService.getPosts$()),

    staleTime: 5000,
  }));
}
