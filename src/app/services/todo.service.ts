import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Todo } from '../models';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  #http = inject(HttpClient);

  getTodoList$ = () =>
    this.#http.get<Array<Todo>>('http://localhost:8080/todo-list').pipe(
      // rxjs operators
      tap((response) => console.log(JSON.stringify(response)))
    );

  postTodo$ = (title: string) => {
    return this.#http.post(`http://localhost:8080/todo-list`, {
      title,
      completed: false,
    }).pipe(
      // rxjs operators
      tap((response) => console.log(JSON.stringify(response)))
    );
  };
}
