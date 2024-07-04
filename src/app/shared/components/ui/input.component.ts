import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="w-full">
      <input
        [ngClass]="{ 'outline outline-2 outline-destroy': error }"
        [attr.aria-describedby]="error ? 'error' : null"
        [attr.name]="name"
      />
      <span *ngIf="error" class="text-destroy">{{ error[0] }}</span>
    </div>
  `,
})
export class InputComponent implements OnInit {
  @Input() error?: string[] | undefined;
  @Input() name!: string;

  ngOnInit(): void {
    console.log('InputComponent initialized');
  }
}
