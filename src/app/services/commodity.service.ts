import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CommodityPaginate } from '../models';
import { delay, tap } from 'rxjs';
import { slow } from './config';

@Injectable({
  providedIn: 'root',
})
export class CommodityService {
  #http = inject(HttpClient);

  getCommodities$ = (page: number, perPage: number) =>
    this.#http.get<CommodityPaginate>(
      `http://localhost:8080/commodities?_page=${page}&_per_page=${perPage}`,
    ).pipe(
      // rxjs operators
      delay(slow),
    );
}
