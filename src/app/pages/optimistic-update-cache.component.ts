import { Component, signal } from '@angular/core';
import { MovieComponent } from '../components/movie.component';
import { MoviesComponent } from '../components/movies.component';

@Component({
  selector: 'app-optimistic-update-cache',
  standalone: true,
  imports: [MovieComponent, MoviesComponent],
  template: ` @if (id() > -1) {
      <app-movie [id]="id()" (setMovieId)="id.set($event)" />
    } @else {
      <app-movies (setMovieId)="id.set($event)" />
    }`,
})
export class OptimisticUpdateCacheComponent {
  id = signal(-1);
}
