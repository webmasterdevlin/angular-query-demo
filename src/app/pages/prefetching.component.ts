import { Component, signal } from '@angular/core';
import { ReportComponent } from '../components/report.component';
import { ReportsComponent } from '../components/reports.component';

@Component({
  selector: 'app-prefetching',
  standalone: true,
  imports: [ReportComponent, ReportsComponent],
  template: ` @if (id() > -1) {
      <app-report [id]="id()" (setReportId)="id.set($event)" />
    } @else {
      <app-reports (setReportId)="id.set($event)" />
    }`,
})
export class PrefetchingComponent {
  id = signal(-1);
}
