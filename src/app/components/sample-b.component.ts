import { Component, inject, OnInit } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { DedupeService } from '../services/dedupe.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SpinnerComponent } from './spinner.component';
import { names } from '../queryKey';

@UntilDestroy()
@Component({
  standalone: true,
  imports: [SharedModule, SpinnerComponent],
  template: `<h2>
    Sample-B Component
    @if (myQuery.isFetching()) {
      <app-spinner></app-spinner>
    }
  </h2>`,
  styles: ``,
  selector: 'app-sample-b',
})
export class SampleBComponent implements OnInit {
  #myService = inject(DedupeService);

  // Angular Query does auto deduplication
  myQuery = injectQuery(() => ({
    queryKey: [names.posts],
    queryFn: () => lastValueFrom(this.#myService.getPosts$()),
    staleTime: 5000,
  }));

  // Plain HTTPClient module does not do deduplication
  fetchUsers() {
    this.#myService.getUsers$().pipe(untilDestroyed(this)).subscribe();
  }

  ngOnInit() {
    this.fetchUsers();
  }
}
