import { HttpClient } from '@angular/common/http';
import {
  Component,
  ChangeDetectionStrategy,
  Output,
  inject,
  EventEmitter,
  input,
} from '@angular/core';
import {
  injectQuery,
  injectQueryClient,
} from '@tanstack/angular-query-experimental';
import { fromEvent, lastValueFrom, takeUntil } from 'rxjs';
import { Movie } from 'src/app/models';
import { MovieService } from '../services/movie.service';
import { names } from '../queryKey';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-movie',
  standalone: true,
  template: `
    <div>
      <div>
        <a (click)="setMovieId.emit(-1)" href="#"> Back </a>
      </div>
      @if (movieQuery.status() === 'pending') {
        Loading...
      } @else if (movieQuery.status() === 'error') {
        Error: {{ movieQuery.error()?.message }}
      }
      @if (movieQuery.data(); as movie) {
        <h1>{{ movie.title }}</h1>
        <div>
          <p>{{ movie.rate }}</p>
        </div>
        @if (movieQuery.isFetching()) {
          Background Updating...
        }
      }
    </div>
  `,
})
export class MovieComponent {
  @Output() setMovieId = new EventEmitter<number>();

  id = input(0);

  #movieService = inject(MovieService);

  movieQuery = injectQuery(() => ({
    enabled: this.id() > 0,
    queryKey: [names.movie, this.id()],
    queryFn: async (context): Promise<Movie> => {
      // Cancels the request when component is destroyed before the request finishes
      const abort$ = fromEvent(context.signal, 'abort');
      return lastValueFrom(
        this.#movieService.movieById$(this.id()).pipe(takeUntil(abort$)),
      );
    },
  }));

  queryClient = injectQueryClient();
}
