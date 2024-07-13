import { Component, inject, signal } from '@angular/core';
import { TodoService } from '../services/todo.service';
import {
  injectQuery,
  injectQueryClient,
} from '@tanstack/angular-query-experimental';
import { names } from '../queryKey';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-polling',
  standalone: true,
  template: `
    <div>
      <h1>Auto Refetch with stale-time set to {{ intervalMs() }} ms</h1>
      <label>
        Query Interval speed (ms):
        <input
          [value]="intervalMs()"
          (input)="setIntervalMs($event)"
          type="number"
          step="1000"
          min="1000"
          max="10000"
        />
      </label>
      <h2>Todo List</h2>
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

  intervalMs = signal(10000);

  setIntervalMs(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = Number(input.value);
    this.intervalMs.set(newValue);
  }

  todoListQuery = injectQuery(() => ({
    queryKey: [names.todos],
    queryFn: () => lastValueFrom(this.#todoService.allTodos$()),
    // refetch the data every second
    refetchInterval: this.intervalMs(),
  }));
}
