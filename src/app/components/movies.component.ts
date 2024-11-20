import {
  Component,
  ChangeDetectionStrategy,
  Output,
  inject,
  EventEmitter,
} from '@angular/core';
import {
  injectMutation,
  injectQuery,
  injectQueryClient,
} from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { names } from 'src/app/state/server/queryKey';
import { MovieService } from '../services/movie.service';
import { Movie } from '../models';
import { cn } from '../utilities/style';
import { SharedModule } from '../shared/shared.module';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-movies',
  imports: [SharedModule],
  template: `<div>
    <h1>Watch History</h1>
    <h2>
      This week
      @if (moviesQuery.isFetching()) {
        (fetching in the background)
      }
    </h2>
    <div class="flex items-center justify-center"></div>
    @switch (moviesQuery.status()) {
      @case ('pending') {
        <pre>Loading. Please wait. <span class="text-orange-300">(one-time only)</span></pre>
      }
      @case ('error') {
        <pre>
          Error: {{ moviesQuery.error()?.message }}
        </pre
        >
      }
      @default {
        <div class="todo-container mb-4">
          @for (movie of moviesQuery.data(); track movie.id) {
            <div class="flex flex-row items-start gap-6">
              <img [src]="movie.imageUrl" [alt]="movie.title" width="200" />
              <div class="mt-6 flex flex-col flex-wrap justify-start">
                <div class="flex flex-wrap gap-10">
                  <a
                    href="optimistic-update-cache#"
                    (click)="setMovieId.emit(movie.id)"
                    [ngClass]="
                      cn({
                        'font-bold text-indigo-500': queryClient.getQueryData([
                          'movie',
                          movie.id,
                        ]),
                      })
                    "
                  >
                    {{ movie.title }} ({{ movie.year }})
                  </a>
                  <button (click)="handleDelete(movie.id)">❌</button>
                </div>
                <div>
                  <small class="text-orange-500"
                    >rating: {{ movie.rate }}/10</small
                  >
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
          }
        </div>
      }
    }
  </div> `,
})
export class MoviesComponent {
  queryClient = injectQueryClient();
  #movieService = inject(MovieService);

  cn = cn;

  @Output() setMovieId = new EventEmitter<number>();

  moviesQuery = injectQuery(() => ({
    queryKey: [names.movies],
    queryFn: () => lastValueFrom(this.#movieService.getMovies$()),
  }));

  deleteMovieMutation = injectMutation(() => ({
    // mutationFn is a function that returns a promise
    mutationFn: (variables: number) =>
      lastValueFrom(this.#movieService.deleteMovie$(variables)),
    // onMutate is a function that returns a context object
    onMutate: async (variables: number) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await this.queryClient.cancelQueries({
        queryKey: [names.movie, variables],
      });
      // Snapshot the previous value
      const backup = this.queryClient.getQueryData<Movie[]>([names.movies]);
      // Optimistically update by removing the movie from the list
      if (backup) {
        this.queryClient.setQueryData<Movie[]>(
          [names.movies],
          [...backup.filter((m) => m.id !== variables)],
        );
        return { backup };
      } else {
        return null;
      }
    },
    // onSuccess is a function that runs after the mutation is successful
    onSuccess: () => {
      // for pessimistic update like saving a new movie using a form
      return;
    },
    // onError is a function that runs after the mutation fails
    onError: (error, variables, context) => {
      // We can use the onError handler to rollback the cache.
      this.queryClient.setQueryData<Movie[]>([names.movies], context?.backup);
    },
    // onSettled is a function that runs after the mutation is successful or fails
    onSettled: async () => {
      await this.queryClient.invalidateQueries({ queryKey: [names.movies] });
    },
  }));

  handleDelete = (id: number) => {
    this.deleteMovieMutation.mutate(id);
  };
}
