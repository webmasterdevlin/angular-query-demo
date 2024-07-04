import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SpinnerIconComponent } from '../icons/spinner-icon.component';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [BrowserModule, SpinnerIconComponent],
  template: `
    <div class="flex justify-between rounded bg-destroy p-4 text-white">
      <ng-content></ng-content>
      <button *ngIf="onReset" (click)="onReset.emit()">
        <!-- Assuming SpinnerIcon is a component you will convert or replace -->
        <app-spinner-icon className="w-20 h-20" />
      </button>
    </div>
  `,
  styles: [
    `
      /* Add your CSS styles here */
    `,
  ],
})
export class ErrorMessageComponent {
  @Input() onReset?: EventEmitter<void>;
}
