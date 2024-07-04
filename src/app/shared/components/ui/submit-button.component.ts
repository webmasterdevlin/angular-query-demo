import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SpinnerIconComponent } from '../icons/spinner-icon.component';

@Component({
  selector: 'app-submit-button',
  standalone: true,
  imports: [SpinnerIconComponent, CommonModule],
  template: `
    <button
      [ngClass]="className"
      [disabled]="isSubmitting || disabled"
      type="button"
      onclick="h"
    >
      @if (isSubmitting) {
        <div class="flex items-center justify-center gap-2">
          <ng-content></ng-content>
          <div class="h-fit w-fit animate-spin">
            @if (theme === 'secondary') {
              <app-spinner-icon className="text-gray-dark" />
            } @else {
              <app-spinner-icon className="text-white" />
            }
          </div>
        </div>
      } @else {
        <ng-content></ng-content>
      }
    </button>
  `,
  styles: [],
})
export class SubmitButtonComponent {
  @Input() theme: 'primary' | 'secondary' | 'destroy' = 'primary';
  @Input() className?: string;
  @Input() loading?: boolean;
  @Input() disabled?: boolean;
  @Output() handleOnClick = new EventEmitter<void>();

  // Assuming useFormStatus equivalent functionality is implemented elsewhere and injected
  get isSubmitting(): boolean | undefined {
    // Replace with actual logic to determine if the form is submitting
    const pending = false; // Placeholder for actual implementation
    return pending || this.loading;
  }

  onSubmit() {
    this.handleOnClick.emit();
  }
}
