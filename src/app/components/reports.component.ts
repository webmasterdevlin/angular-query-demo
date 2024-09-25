import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
  injectQueryClient,
  injectQuery,
} from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { names } from '../queryKey';
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
