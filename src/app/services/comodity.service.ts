import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ComodityPage } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ComodityService {
  #http = inject(HttpClient);

  fetchComodity$ = (page: number, perPage: number) =>
    this.#http.get<ComodityPage>(
      `http://localhost:8080/comodities?_page=${page}&_per_page=${perPage}`,
    );
}
