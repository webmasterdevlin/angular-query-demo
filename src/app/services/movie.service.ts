import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Movie } from '../models';
import { delay, tap } from 'rxjs';
import { slow } from './config';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  #http = inject(HttpClient);

  getMovieById$ = (id: number) =>
    this.#http.get<Movie>(`http://localhost:8080/movies/${id}`).pipe(
      // rxjs operators
      delay(slow),
    );

  getMovies$ = () =>
    this.#http.get<Array<Movie>>('http://localhost:8080/movies').pipe(
      // rxjs operators
      delay(slow),
    );

  deleteMovie$ = (id: number) =>
    this.#http.delete(`http://localhost:8080/movies/${id}`).pipe(
      // rxjs operators
      delay(slow),
    );
}
