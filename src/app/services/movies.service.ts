import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Movie } from '../models';

@Injectable({
  providedIn: 'root',
})
export class MvoiesService {
  #http = inject(HttpClient);

  postById$ = (id: number) =>
    this.#http.get<Movie>(`http://localhost:8080/movies/${id}`);

  allPosts$ = () =>
    this.#http.get<Array<Movie>>('http://localhost:8080/movies');
}
