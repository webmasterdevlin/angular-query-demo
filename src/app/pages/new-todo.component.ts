import { Component, inject, signal } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormGroup, FormBuilder } from '@angular/forms';
import {
  injectQueryClient,
  injectMutation,
} from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-new-todo',
  standalone: true,
  imports: [SharedModule],
  template: `
    <div>
      <h1>Create a new todo</h1>
      <form [formGroup]="todoForm" (ngSubmit)="onSubmit()">
        <input formControlName="value" placeholder="enter something" />
      </form>
    </div>
  `,
})
export class NewTodoComponent {
  queryClient = injectQueryClient();
  #todoService = inject(TodoService);

  intervalMs = signal(5000);
  todoForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.todoForm = this.fb.group({
      value: '',
    });
  }

  addTodoMutation = injectMutation(() => ({
    mutationFn: (variables: string) =>
      lastValueFrom(this.#todoService.addTodo$(variables)),
    onSuccess: (data) => {
      // commented out becaue we are using polling to refetch the data for demo purposes
      // this.queryClient.setQueryData<Todo[]>([names.todos], (cache: any) => {
      //   return cache ? [...cache, data] : [data];
      // });
    },
  }));

  onSubmit() {
    this.addTodoMutation.mutate(this.todoForm.value.value);
    this.todoForm.reset();
  }
}
