import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Report } from '../models';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  #http = inject(HttpClient);

  getReportById$ = (id: number) =>
    this.#http.get<Report>(`http://localhost:8080/reports/${id}`).pipe(
      // rxjs operators
      tap((response) => console.log(JSON.stringify(response)))
    );

  getReports$ = () =>
    this.#http.get<Array<Report>>('http://localhost:8080/reports').pipe(
      // rxjs operators
      tap((response) => console.log(JSON.stringify(response)))
    );
}
