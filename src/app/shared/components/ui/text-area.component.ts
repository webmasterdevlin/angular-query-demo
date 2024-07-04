import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-area',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div>
      <textarea
        [ngClass]="{ 'outline outline-2 outline-destroy': error }"
        aria-describedby="error"
        [attr.name]="name"
        [ngModel]="value"
      ></textarea>
      <span *ngIf="error" class="font- text-destroy">{{ error[0] }}</span>
    </div>
  `,
})
export class TextAreaComponent {
  @Input() error?: string[] | undefined;
  @Input() name!: string;
  value = ''; // Assuming you want to bind this to the textarea, add ngModel for two-way data binding
}
