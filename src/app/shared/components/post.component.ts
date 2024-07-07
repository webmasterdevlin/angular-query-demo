import { HttpClient } from '@angular/common/http';
import {
  Component,
  ChangeDetectionStrategy,
  Output,
  Input,
  signal,
  inject,
  EventEmitter,
} from '@angular/core';
import {
  injectQuery,
  injectQueryClient,
} from '@tanstack/angular-query-experimental';
import { fromEvent, lastValueFrom, takeUntil } from 'rxjs';
import { Movie } from 'src/app/models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'movie',
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
          <p>{{ movie.body }}</p>
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

  // Until Angular supports signal-based inputs, we have to set a signal
  @Input({ required: true, alias: 'movieId' })
  set _movieId(value: number) {
    this.movieId.set(value);
  }
  movieId = signal(0);
  httpClient = inject(HttpClient);

  getMovie$ = (movieId: number) => {
    return this.httpClient.get<Movie>(
      `http://localhost:8080/movies/${movieId}`,
    );
  };

  movieQuery = injectQuery(() => ({
    enabled: this.movieId() > 0,
    queryKey: ['movie', this.movieId()],
    queryFn: async (context): Promise<Movie> => {
      // Cancels the request when component is destroyed before the request finishes
      const abort$ = fromEvent(context.signal, 'abort');
      return lastValueFrom(
        this.getMovie$(this.movieId()).pipe(takeUntil(abort$)),
      );
    },
  }));

  queryClient = injectQueryClient();
}
