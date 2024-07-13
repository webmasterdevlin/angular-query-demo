import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Album } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AlbumService {
  #http = inject(HttpClient);

  albumById$ = (id: number) =>
    this.#http.get<Album>(`https://jsonplaceholder.typicode.com/albums/${id}`);

  allAlbums$ = () =>
    this.#http.get<Array<Album>>('https://jsonplaceholder.typicode.com/albums');
}
