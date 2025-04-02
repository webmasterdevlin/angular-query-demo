import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DedupeService {
  #http = inject(HttpClient);

  getPosts$ = () => this.#http.get(`http://localhost:8080/posts`).pipe();

  getUsers$ = () => this.#http.get(`http://localhost:8080/users`).pipe();
}
