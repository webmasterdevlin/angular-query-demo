import { Component, inject, OnInit } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DedupeService } from '../services/dedupe.service';
import { SampleAComponent } from '../components/sample-a.component';
import { SampleBComponent } from '../components/sample-b.component';
import { SpinnerComponent } from '../components/spinner.component';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { injectDedupeQuery } from '../state/server/queries/dedupeQueries';

@UntilDestroy()
@Component({
  imports: [SharedModule, SampleAComponent, SampleBComponent, SpinnerComponent],
  template: `<h1>
      Deduping Page
      @if (myQuery.status() === 'pending') {
        <app-spinner></app-spinner>
      }
    </h1>
    <app-sample-a></app-sample-a>
    <app-sample-b></app-sample-b>`,
  styles: ``,
})
export class DedupingComponent implements OnInit {
  #myService = inject(DedupeService);

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
