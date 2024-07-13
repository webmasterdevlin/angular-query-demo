import { Component } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-new-todo',
  standalone: true,
  imports: [SharedModule],
  template: `
    <div>
      <h1>Auto Refetch with stale-time set to {{ intervalMs }}ms</h1>
      <p>
        This example is best experienced on your own machine, where you can open
        multiple tabs to the same localhost server and see your changes
        propagate between the two.
      </p>
      <label>
        Query Interval speed (ms):
        <input
          [value]="intervalMs"
          (input)="setIntervalMs($event.target.value)"
          type="number"
          step="100"
        />
        <span
          [style.background]="isFetching ? 'green' : 'transparent'"
          [style.transition]="!isFetching ? 'all .3s ease' : 'none'"
        ></span>
      </label>
      <h2>Todo List</h2>
      <form [formGroup]="todoForm" (ngSubmit)="onSubmit()">
        <input formControlName="value" placeholder="enter something" />
      </form>
      <ul>
        <li *ngFor="let item of data">{{ item }}</li>
      </ul>
      <div>
        <button (click)="clearTodos()">Clear All</button>
      </div>
    </div>
  `,
})
export class NewTodoComponent {
  // url for creating a new todo: http://localhost:8080/todo-list
}
