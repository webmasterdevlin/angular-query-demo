import { Component, inject, signal } from '@angular/core';
import { TodoService } from '../services/todo.service';
import {
  injectQuery,
} from '@tanstack/angular-query-experimental';
import { names } from '../state/server/queryKey';
import { lastValueFrom } from 'rxjs';
import { cn } from '../utilities/style';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-polling',
  standalone: true,
  imports: [SharedModule],
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
      <span
        [ngClass]="
          cn(
            'scale-200 ease ml-2.5 inline-block h-2.5 w-2.5 transform rounded-full transition-all',
            todoListQuery.isFetching()
              ? 'bg-green-500 transition-none'
              : 'bg-transparent'
          )
        "
      ></span>
      <h2>Todo List</h2>
      <ul>
        <a
          class="text-indigo-700"
          routerLink="/new-todo" target="_blank">
        Add new</a>
        @for (todo of todoListQuery.data(); track todo.id) {
          <li>{{ todo.title }}</li>
        }
      </ul>
    </div>
  `,
})
export class PollingComponent {
  cn = cn;
  #todoService = inject(TodoService);

  intervalMs = signal(10000);

  setIntervalMs(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = Number(input.value);
    this.intervalMs.set(newValue);
  }

  todoListQuery = injectQuery(() => ({
    queryKey: [names.todos],
    queryFn: () => lastValueFrom(this.#todoService.getTodoList$()),
    refetchInterval: this.intervalMs(),
  }));
}
