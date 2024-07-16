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
import { Album } from 'src/app/models';
import { AlbumService } from '../services/album.service';
import { names } from '../queryKey';
import { JsonPipe } from '@angular/common';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-album',
  standalone: true,
  imports:[JsonPipe],
  template: `
    <div>
      <h2>
        <a (click)="setAlbumId.emit(-1)" href="prefetching#">🔙</a>
      </h2>
      @if (albumQuery.status() === 'pending') {
        <pre>Loading. Please wait. <span class="text-orange-300">(one-time only)</span></pre>
      } @else if (albumQuery.status() === 'error') {
        <pre>Error: {{ albumQuery.error()?.message }}</pre>
      }
      @if (albumQuery.data(); as album) {
        <div class="flex flex-row items-start gap-6">
          <div class="flex flex-col flex-wrap justify-start">
            <div class="flex flex-wrap gap-10">
              <p>
                {{ album | json }}
              </p>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-center">
          @if (albumQuery.isFetching()) {
            <pre>Fetching in the background</pre>
          }
        </div>
      }
    </div>
  `,
})
export class AlbumComponent {
  #albumService = inject(AlbumService);

  id = input(0);

  @Output() setAlbumId = new EventEmitter<number>();

  albumQuery = injectQuery(() => ({
    enabled: this.id() > 0,
    queryKey: [names.album, this.id()],
    queryFn: async () => lastValueFrom(
        this.#albumService.albumById$(this.id())
      )
  }));
}
