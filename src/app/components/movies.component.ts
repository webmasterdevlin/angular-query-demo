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
import { names } from 'src/app/queryKey';
import { MovieService } from '../services/movie.service';
import { Movie } from '../models';
import { cn } from '../utilities/style';
import { SharedModule } from '../shared/shared.module';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-movies',
  standalone: true,
  imports: [SharedModule],
  template: `<div>
    <h1>Watch History</h1>
    <h2>This week</h2>
    @switch (moviesQuery.status()) {
      @case ('pending') {
        <pre>Loading. Please wait.</pre>
      }
      @case ('error') {
        <pre>
          Error: {{ moviesQuery.error()?.message }}
        </pre
        >
      }
      @default {
        <div class="todo-container m mb-4">
          @for (movie of moviesQuery.data(); track movie.id) {
            <div class="flex flex-row items-start gap-6">
              <img [src]="movie.imageUrl" [alt]="movie.title" width="200" />
              <div class="mt-6 flex flex-col flex-wrap justify-start">
                <div class="flex flex-wrap gap-10">
                  <a
                    href="#"
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
    <div class="flex items-center justify-center">
      @if (moviesQuery.isFetching()) {
        <div
          class="h-16 w-16 animate-spin rounded-full border-4 border-t-4 border-blue-500 border-t-transparent"
        ></div>
      }
    </div>
  </div> `,
})
export class MoviesComponent {
  cn = cn;
  queryClient = injectQueryClient();

  @Output() setMovieId = new EventEmitter<number>();

  #movieService = inject(MovieService);

  moviesQuery = injectQuery(() => ({
    queryKey: [names.movies],
    queryFn: () => lastValueFrom(this.#movieService.allMovies$()),
  }));

  deleteMovieMutation = injectMutation(() => ({
    mutationFn: (id: number) => {
      return lastValueFrom(this.#movieService.deleteMovie$(id));
    },
    onMutate: async (id: number) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await this.queryClient.cancelQueries({
        queryKey: [names.movie, id],
      });
      // Snapshot the previous value
      const backup = this.queryClient.getQueryData<Movie[]>([names.movies]);
      // Optimistically update by removing the movie from the list
      if (backup) {
        this.queryClient.setQueryData<Movie[]>(
          [names.movies],
          [...backup.filter((m) => m.id !== id)],
        );
        return { backup };
      } else {
        return { backup: null };
      }
    },
    // We can use the onError handler to rollback the cache.
    onError: (error, variables, context) => {
      if (context?.backup) {
        this.queryClient.setQueryData<Movie[]>([names.movies], context.backup);
      }
    },
    // always refetch after error or success:
    onSettled: () => {
      this.queryClient.invalidateQueries({ queryKey: [names.movies] });
    },
  }));

  handleDelete = (id: number) => {
    this.deleteMovieMutation.mutate(id);
  };
}
