import { AngularQueryDevtools } from '@tanstack/angular-query-devtools-experimental';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MovieComponent } from './shared/components/movie.component';
import { MoviesComponent } from './shared/components/movies.component';

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
    <angular-query-devtools initialIsOpen />
    @if (id() > -1) {
      <app-movie [id]="id()" (setMovieId)="id.set($event)" />
    } @else {
      <app-movies (setMovieId)="id.set($event)" />
    }
  `,
  imports: [AngularQueryDevtools, MovieComponent, MoviesComponent],
})
export class AppComponent {
  id = signal(-1);
}
