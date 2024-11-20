import { Component } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormGroup, FormBuilder } from '@angular/forms';
import { addTodoMutation } from '../state/server/mutations/todoMutations';

@Component({
  selector: 'app-new-todo',
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
  todoForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.todoForm = this.fb.group({
      value: '',
    });
  }

  addTodoMutation = addTodoMutation();

  onSubmit() {
    this.addTodoMutation.mutate(this.todoForm.value.value);
    this.todoForm.reset();
  }
}
