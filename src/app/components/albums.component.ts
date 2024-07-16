import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
  injectQueryClient,
  injectQuery,
} from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { names } from '../queryKey';
import { AlbumService } from '../services/album.service';

@Component({
  selector: 'app-albums',
  standalone: true,
  template: `<h2>Prefetching in tanstack query</h2>
    <div class="todo-container mb-4">
      @for (album of albumsQuery.data(); track album.id) {
        <div
          class="flex flex-row items-start gap-6"
          (mouseenter)="handleOnMouseEnter(album.id)"
        >
          <div class="mt-6 flex flex-col flex-wrap justify-start">
            <div class="flex flex-wrap gap-10">
              <a href="prefetching#" (click)="setAlbumId.emit(album.id)">
                {{ album.title }}
              </a>
            </div>
          </div>
        </div>
      }
    </div>`,
})
export class AlbumsComponent {
  queryClient = injectQueryClient();
  #albumService = inject(AlbumService);

  @Output() setAlbumId = new EventEmitter<number>();

  albumsQuery = injectQuery(() => ({
    queryKey: [names.albums],
    queryFn: () => lastValueFrom(this.#albumService.allAlbums$()),
  }));

  async handleOnMouseEnter(albumId: number) {
    /* When you know or suspect that a certain piece of data will be needed,
    you can use prefetching to populate the cache with that data ahead of time,
    leading to a faster experience. */
    await this.queryClient.prefetchQuery({
      queryKey: [names.album, albumId],
      queryFn: () => lastValueFrom(this.#albumService.albumById$(albumId)),
    });
  }
}
