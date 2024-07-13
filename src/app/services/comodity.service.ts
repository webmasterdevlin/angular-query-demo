import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Comodity } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ComodityService {
  #http = inject(HttpClient);

  comodityById$ = (id: number) =>
    this.#http.get<Comodity>(`http://localhost:8080/comodities/${id}`);

  allcomoditys$ = () =>
    this.#http.get<Array<Comodity>>('http://localhost:8080/comodities');
}
