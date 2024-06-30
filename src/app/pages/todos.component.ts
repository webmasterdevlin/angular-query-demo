import { Component, inject, signal, OnInit } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [SharedModule],
  template: `
    <h1>Todos Works!</h1>
    <ul>
      <!-- @for (todo of store().todos; track todo.id; let idx = $index, e = $even) {
      <li>
        <span data-testid="todo-title" class="mr-5">{{ todo.title }}</span>
      } </li> -->
    </ul>
  `,
})
export class TodosComponent implements OnInit {
  ngOnInit(): void {
    console.log('TodosComponent initialized');
  }
}
