import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Movie } from '../models';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  #http = inject(HttpClient);

  getMovieById$ = (id: number) =>
    this.#http.get<Movie>(`http://localhost:8080/movies/${id}`);

  getMovies$ = () =>
    this.#http.get<Array<Movie>>('http://localhost:8080/movies');

  deleteMovie$ = (id: number) =>
    this.#http.delete(`http://localhost:8080/movies/${id}`);
}
