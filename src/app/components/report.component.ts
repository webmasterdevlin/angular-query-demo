import {
  Component,
  ChangeDetectionStrategy,
  Output,
  inject,
  EventEmitter,
  input,
} from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { ReportService } from '../services/report.service';
import { names } from '../state/server/queryKey';
import { JsonPipe } from '@angular/common';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-report',
  standalone: true,
  imports: [JsonPipe],
  template: `
    <div>
      <h2>
        <a (click)="setReportId.emit(-1)" href="prefetching#">🔙</a>
      </h2>
      @if (reportQuery.status() === 'pending') {
        <pre>Loading. Please wait. <span class="text-orange-300">(one-time only)</span></pre>
      } @else if (reportQuery.status() === 'error') {
        <pre>Error: {{ reportQuery.error()?.message }}</pre>
      }
      @if (reportQuery.data(); as report) {
        <div class="flex flex-row items-start gap-6">
          <div class="flex flex-col flex-wrap justify-start">
            <div class="flex flex-wrap gap-10">
              <p>
                {{ report | json }}
              </p>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-center">
          @if (reportQuery.isFetching()) {
            <pre>Fetching in the background</pre>
          }
        </div>
      }
    </div>
  `,
})
export class ReportComponent {
  #reportService = inject(ReportService);

  id = input(0);

  @Output() setReportId = new EventEmitter<number>();

  reportQuery = injectQuery(() => ({
    enabled: this.id() > 0,
    queryKey: [names.report, this.id()],
    queryFn: async () =>
      lastValueFrom(this.#reportService.getReportById$(this.id())),
  }));
}
