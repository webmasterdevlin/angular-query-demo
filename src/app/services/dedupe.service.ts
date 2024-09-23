import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { delay } from 'rxjs';
import { slow } from './config';

@Injectable({
  providedIn: 'root',
})
export class DedupeService {
  #http = inject(HttpClient);

  getPosts$ = () =>
    this.#http.get(`
       https://jsonplaceholder.typicode.com/posts
        `).pipe(delay(slow));
  
  getUsers$ = () =>
    this.#http.get(`
        https://jsonplaceholder.typicode.com/users
          `).pipe(delay(slow));
}
