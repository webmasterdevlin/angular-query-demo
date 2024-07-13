import { Component, signal } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import {} from '@tanstack/angular-query-experimental';
import { AlbumComponent } from '../components/album.component';
import { AlbumsComponent } from '../components/albums.component';

@Component({
  selector: 'app-prefetching',
  standalone: true,
  imports: [SharedModule, AlbumComponent, AlbumsComponent],
  template: ` @if (id() > -1) {
      <app-album [id]="id()" (setAlbumId)="id.set($event)" />
    } @else {
      <app-albums (setAlbumId)="id.set($event)" />
    }`,
})
export class PrefetchingComponent {
  id = signal(-1);
}
