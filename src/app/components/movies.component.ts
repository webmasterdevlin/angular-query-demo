import { HttpClient } from '@angular/common/http';
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

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-movies',
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
            <div class="flex gap-2">
              <p>
                {{ movie.title }}
              </p>
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
                >see more..</a
              >
              <button (click)="handleDelete(movie.id)">delete</button>
            </div>
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
  queryClient = injectQueryClient();

  @Output() setMovieId = new EventEmitter<number>();

  #movieService = inject(MovieService);

  moviesQuery = injectQuery(() => ({
    queryKey: [names.movies],
    queryFn: () => lastValueFrom(this.#movieService.allMovies$()),
  }));

  deleteMovieMutation = injectMutation(() => ({
    mutationFn: (id) => lastValueFrom(this.#movieService.deleteMovie$(id)),
    onMutate: async (id: number) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await this.queryClient.cancelQueries({
        queryKey: [names.movies],
      });
      // Snapshot the previous value
      const backup = this.queryClient.getQueryData<{ data: Movie[] }>([
        names.movies,
      ]);
      // Optimistically update by removing the movie from the list
      if (backup) {
        this.queryClient.setQueryData<{ data: Movie[] }>([names.movies], {
          data: [...backup.data.filter((m) => m.id !== id)],
        });
        return { backup };
      } else {
        return { backup: null };
      }
    },
    // We can use the onError handler to rollback the cache.
    onError: (error, variables, context) => {
      if (context?.backup) {
        this.queryClient.setQueryData<Movie[]>(
          [names.movies],
          context.backup.data,
        );
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
