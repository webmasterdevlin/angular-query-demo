import { AngularQueryDevtools } from '@tanstack/angular-query-devtools-experimental';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MovieComponent } from './components/movie.component';
import { MoviesComponent } from './components/movies.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  standalone: true,
  template: `
    <div
      class="container prose mx-auto mt-4 rounded-lg bg-gray-500 p-4 shadow-lg"
    >
      @if (id() > -1) {
        <app-movie [id]="id()" (setMovieId)="id.set($event)" />
      } @else {
        <app-movies (setMovieId)="id.set($event)" />
      }
    </div>
    <angular-query-devtools initialIsOpen />
  `,
  imports: [AngularQueryDevtools, MovieComponent, MoviesComponent],
})
export class AppComponent {
  id = signal(-1);
}
