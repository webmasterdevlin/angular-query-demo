import { Component, inject } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { DedupeService } from '../services/dedupe.service';
import { SpinnerComponent } from './spinner.component';

@Component({
  standalone: true,
  imports: [SharedModule, SpinnerComponent],
  template: `<h2>Sample-B Component
    @if (myQuery.isFetching()) {
      <app-spinner></app-spinner>
    }
  </h2>`,
  styles: ``,
  selector: 'app-sample-b',
})
export class SampleBComponent {
  #myService = inject(DedupeService);

  myQuery = injectQuery(() => ({
    queryKey: ['tests'],
    queryFn: () => lastValueFrom(this.#myService.getPosts$()),

    staleTime: 5000,
  }));
}
