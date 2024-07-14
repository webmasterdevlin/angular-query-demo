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
import { cn } from '../utilities/style';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-movie',
  standalone: true,
  template: `
    <div>
      <h2>
        <a (click)="setMovieId.emit(-1)" href="optimistic-update-cache#">🔙</a>
      </h2>
      @if (movieQuery.status() === 'pending') {
        <pre>Loading. Please wait. <span class="text-orange-300">(one-time only)</span></pre>
      } @else if (movieQuery.status() === 'error') {
        <pre>Error: {{ movieQuery.error()?.message }}</pre>
      }
      @if (movieQuery.data(); as movie) {
        <div class="flex flex-row items-start gap-6">
          <img [src]="movie.imageUrl" [alt]="movie.title" width="200" />
          <div class="flex flex-col flex-wrap justify-start">
            <div class="flex flex-wrap gap-10">
              <p (click)="setMovieId.emit(movie.id)">
                {{ movie.title }} ({{ movie.year }})
              </p>
            </div>
            <div>
              <small class="text-orange-500">rating: {{ movie.rate }}/10</small>
            </div>
            <div>
              <p>{{ movie.description }}</p>
            </div>
            <div>
              <p>Director: {{ movie.director }}</p>
            </div>
            <div>
              <p>Duration: {{ movie.duration }}</p>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-center">
          @if (movieQuery.isFetching()) {
            <pre>Fetching in the background</pre>
          }
        </div>
      }
    </div>
  `,
})
export class MovieComponent {
  #movieService = inject(MovieService);

  cn = cn;
  id = input(0);

  @Output() setMovieId = new EventEmitter<number>();

  movieQuery = injectQuery(() => ({
    enabled: this.id() > 0,
    queryKey: [names.movie, this.id()],
    queryFn: () => {
      return lastValueFrom(this.#movieService.movieById$(this.id()));
    },
  }));

  queryClient = injectQueryClient();
}
