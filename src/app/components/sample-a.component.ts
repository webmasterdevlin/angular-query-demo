import { Component, inject, OnInit } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DedupeService } from '../services/dedupe.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SpinnerComponent } from './spinner.component';
import { injectDedupeQuery } from '../state/server/queries/dedupeQueries';

@UntilDestroy()
@Component({
  imports: [SharedModule, SpinnerComponent],
  template: `<h2>
    Sample-A Component
    @if (myQuery.status() === 'pending') {
      <app-spinner></app-spinner>
    }
  </h2>`,
  styles: ``,
  selector: 'app-sample-a',
})
export class SampleAComponent implements OnInit {
  #myService = inject(DedupeService);

  // Plain HTTPClient module does not do deduplication
  fetchUsers() {
    this.#myService.getUsers$().pipe(untilDestroyed(this)).subscribe();
  }

  // reusable query
  // Angular Query does auto deduplication
  myQuery = injectDedupeQuery();

  ngOnInit() {
    this.fetchUsers();
  }
}
