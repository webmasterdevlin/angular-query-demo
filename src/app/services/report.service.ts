import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Report } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  #http = inject(HttpClient);

  getReportById$ = (id: number) =>
    this.#http.get<Report>(`http://localhost:8080/reports/${id}`).pipe();

  getReports$ = () =>
    this.#http.get<Array<Report>>('http://localhost:8080/reports').pipe();
}
