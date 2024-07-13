import { Component, signal } from '@angular/core';
import { AlbumComponent } from '../components/album.component';
import { AlbumsComponent } from '../components/albums.component';

@Component({
  selector: 'app-prefetching',
  standalone: true,
  imports: [AlbumComponent, AlbumsComponent],
  template: ` @if (id() > -1) {
      <app-album [id]="id()" (setAlbumId)="id.set($event)" />
    } @else {
      <app-albums (setAlbumId)="id.set($event)" />
    }`,
})
export class PrefetchingComponent {
  id = signal(-1);
}
