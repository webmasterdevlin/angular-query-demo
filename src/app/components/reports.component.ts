import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
  injectQueryClient,
  injectQuery,
} from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { names } from '../state/server/queryKey';
import { ReportService } from '../services/report.service';

@Component({
  selector: 'app-reports',
  standalone: true,
  template: `<h2>Prefetching in tanstack query</h2>
    <div class="todo-container mb-4">
      @for (report of reportsQuery.data(); track report.id) {
        <div
          class="flex flex-row items-start gap-6"
          (mouseenter)="handleOnMouseEnter(report.id)"
        >
          <div class="mt-6 flex flex-col flex-wrap justify-start">
            <div class="flex flex-wrap gap-10">
              <a href="prefetching#" (click)="setReportId.emit(report.id)">
                {{ report.title }}
              </a>
            </div>
          </div>
        </div>
      }
    </div>`,
})
export class ReportsComponent {
  queryClient = injectQueryClient();
  #reportService = inject(ReportService);

  @Output() setReportId = new EventEmitter<number>();

  reportsQuery = injectQuery(() => ({
    queryKey: [names.reports],
    queryFn: () => lastValueFrom(this.#reportService.getReports$()),
    staleTime: Infinity,
    gcTime: Infinity,
  }));

  async handleOnMouseEnter(reportId: number) {
    /* When you know or suspect that a certain piece of data will be needed,
    you can use prefetching to populate the cache with that data ahead of time,
    leading to a faster experience. */
    await this.queryClient.prefetchQuery({
      queryKey: [names.report, reportId],
      queryFn: () =>
        lastValueFrom(this.#reportService.getReportById$(reportId)),
      staleTime: Infinity,
      gcTime: Infinity,
    });
  }
}
// StaleTime: The duration until a query transitions from fresh to stale. As long as the query is fresh, data will always be read from the cache only - no network request will happen! If the query is stale (which per default is: instantly), you will still get data from the cache, but a background refetch can happen under certain conditions.

// CacheTime: The duration until inactive queries will be removed from the cache. This defaults to 5 minutes. Queries transition to the inactive state as soon as there are no observers registered, so when all components which use that query have unmounted.
