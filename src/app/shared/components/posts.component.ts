import { HttpClient } from '@angular/common/http';
import {
  Component,
  ChangeDetectionStrategy,
  Output,
  inject,
  EventEmitter,
} from '@angular/core';
import {
  injectQuery,
  injectQueryClient,
} from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { Movie } from 'src/app/models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'movies',
  standalone: true,
  template: `<div>
    <h1>Movies</h1>
    @switch (moviesQuery.status()) {
      @case ('pending') {
        Loading...
      }
      @case ('error') {
        Error: {{ moviesQuery.error()?.message }}
      }
      @default {
        <div class="todo-container">
          @for (movie of moviesQuery.data(); track movie.id) {
            <p>
              <!--          We can access the query data here to show bold links for-->
              <!--          ones that are cached-->
              <a
                href="#"
                (click)="setMovieId.emit(movie.id)"
                [style]="
                  queryClient.getQueryData(['movie', movie.id])
                    ? {
                        fontWeight: 'bold',
                        color: 'green',
                      }
                    : {}
                "
                >{{ movie.title }}</a
              >
            </p>
          }
        </div>
      }
    }
    <div>
      @if (moviesQuery.isFetching()) {
        Background Updating...
      }
    </div>
  </div> `,
})
export class MoviesComponent {
  @Output() setMovieId = new EventEmitter<number>();

  movies$ = inject(HttpClient).get<Array<Movie>>(
    'http://localhost:8080/movies',
  );

  moviesQuery = injectQuery(() => ({
    queryKey: ['movies'],
    queryFn: () => lastValueFrom(this.movies$),
  }));

  queryClient = injectQueryClient();
}
