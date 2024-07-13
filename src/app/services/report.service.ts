import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Report } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  #http = inject(HttpClient);

  reportById$ = (id: number) =>
    this.#http.get<Report>(`http://localhost:8080/reports/${id}`);

  allReports$ = () =>
    this.#http.get<Array<Report>>('http://localhost:8080/reports');

  deleteReport$ = (id: number) =>
    this.#http.delete(`http://localhost:8080/reports/${id}`);

  addReport$ = (report: Report) =>
    this.#http.post(`http://localhost:8080/reports`, report);
}
