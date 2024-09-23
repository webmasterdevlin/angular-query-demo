import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DedupeService {
  #http = inject(HttpClient);

  getPosts$ = () =>
    this.#http.get(`
       https://jsonplaceholder.typicode.com/posts
        `);
  
  getUsers$ = () =>
    this.#http.get(`
        https://jsonplaceholder.typicode.com/users
          `);
}
