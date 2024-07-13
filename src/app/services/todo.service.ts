import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Todo } from '../models';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  #http = inject(HttpClient);

  todoById$ = (id: number) =>
    this.#http.get<Todo>(`http://localhost:8080/todo-list/${id}`);

  allTodos$ = () =>
    this.#http.get<Array<Todo>>('http://localhost:8080/todo-list');

  deleteTodo$ = (id: number) =>
    this.#http.delete(`http://localhost:8080/todo-list/${id}`);

  addTodo$ = (title: string) => {
    return this.#http.post(`http://localhost:8080/todo-list`, {
      title,
      completed: false,
    });
  };
}
