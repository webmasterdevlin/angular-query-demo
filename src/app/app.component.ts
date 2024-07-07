import { AngularQueryDevtools } from '@tanstack/angular-query-devtools-experimental';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MoviesComponent } from './shared/components/movies.component';
import { MovieComponent } from './shared/components/movie.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  standalone: true,
  template: `
    <p>
      As you visit the movies below, you will notice them in a loading state the
      first time you load them. However, after you return to this list and click
      on any movies you have already visited again, you will see them load
      instantly and background refresh right before your eyes!
      <strong>
        (You may need to throttle your network speed to simulate longer loading
        sequences)
      </strong>
    </p>
    <angular-query-devtools initialIsOpen="true" />
    @if (movieId() > -1) {
      <movie [movieId]="movieId()" (setMovieId)="movieId.set($event)"></movie>
    } @else {
      <movies (setMovieId)="movieId.set($event)" />
    }
  `,
  imports: [AngularQueryDevtools, MovieComponent, MoviesComponent],
})
export class AppComponent {
  movieId = signal(-1);
}
