import { Component, inject, signal } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TodoService } from '../services/todo.service';
import {
  injectMutation,
  injectQuery,
  injectQueryClient,
} from '@tanstack/angular-query-experimental';
import { names } from '../queryKey';
import { lastValueFrom } from 'rxjs';
import { Todo } from '../models';

@Component({
  selector: 'app-polling',
  standalone: true,
  imports: [SharedModule],
  template: `
    <div>
      <h1>Auto Refetch with stale-time set to {{ intervalMs() }} sec</h1>
      <label>
        Query Interval speed (sec):
        <input
          [value]="intervalMs()"
          (input)="setIntervalMs($event)"
          type="number"
          step="1"
          min="1"
          max="10"
        />
      </label>
      <h2>Todo List</h2>
      <form [formGroup]="todoForm" (ngSubmit)="onSubmit()">
        <input formControlName="value" placeholder="enter something" />
      </form>
      <ul>
        @for (todo of todoListQuery.data(); track todo.id) {
          <li>{{ todo.title }}</li>
        }
      </ul>
    </div>
  `,
})
export class PollingComponent {
  queryClient = injectQueryClient();
  #todoService = inject(TodoService);

  intervalMs = signal(2);
  todoForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.todoForm = this.fb.group({
      value: '',
    });
  }

  setIntervalMs(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = Number(input.value);
    this.intervalMs.set(newValue);
  }

  todoListQuery = injectQuery(() => ({
    queryKey: [names.todos],
    queryFn: () => lastValueFrom(this.#todoService.allTodos$()),
    // refetch the data every second
    refetchInterval: this.intervalMs() * 1000,
  }));

  addTodoMutation = injectMutation(() => ({
    mutationFn: (variables: string) =>
      lastValueFrom(this.#todoService.addTodo$(variables)),
    onSuccess: (data) => {
      this.queryClient.invalidateQueries({ queryKey: [names.todos] });
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
