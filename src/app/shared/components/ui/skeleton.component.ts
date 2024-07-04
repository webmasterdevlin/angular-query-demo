import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [ngClass]="['flex-1', className]">
      <div class="skeleton-animation mb-2 h-3 w-10 rounded"></div>
      <div class="skeleton-animation mb-2 h-4 rounded"></div>
      <div class="skeleton-animation mb-2 h-4 rounded"></div>
      <div class="skeleton-animation mb-2 h-2 w-12 rounded"></div>
      <div class="skeleton-animation mb-2 h-2 w-20 rounded"></div>
    </div>
  `,
  styles: [],
})
export class SkeletonComponent {
  @Input() className?: string;
}
