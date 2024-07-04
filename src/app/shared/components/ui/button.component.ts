import { CommonModule } from '@angular/common';
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { cn } from 'src/app/utilities/style';

@Component({
  selector: 'app-button',
  template: `
    <button [attr.type]="type" [ngClass]="buttonClass">
      <ng-content></ng-content>
    </button>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class ButtonComponent {
  @Input() type?: 'button' | 'submit' | 'reset';
  @Input() theme: 'primary' | 'secondary' | 'destroy' = 'primary';

  get buttonClass(): string {
    const colorClass =
      this.theme === 'secondary'
        ? 'bg-white text-primary disabled:text-gray-dark'
        : this.theme === 'destroy'
          ? 'bg-destroy text-white disabled:bg-gray-dark'
          : 'bg-primary text-white disabled:bg-primary-dark';

    return cn(
      colorClass,
      'm-0 rounded-lg border-none px-3 py-2 font-medium shadow-sm hover:shadow-md active:shadow-xs active:enabled:translate-y-px disabled:translate-y-px disabled:shadow-xs',
    );
  }
}
