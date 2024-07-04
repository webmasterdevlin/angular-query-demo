import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { cn } from 'src/app/utilities/style';

@Component({
  selector: 'app-link-button',
  template: `
    <a
      [routerLink]="href"
      [attr.href]="href"
      [ngClass]="computeClass()"
      class="m-0 rounded-lg border-none px-3 py-2 font-medium no-underline shadow-sm hover:shadow-md active:shadow-xs"
    >
      <ng-content></ng-content>
    </a>
  `,
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class LinkButtonComponent {
  @Input() href = '';
  @Input() theme: 'primary' | 'secondary' | 'destroy' = 'primary';

  constructor(private router: Router) {}

  computeClass(): string {
    const colorClass =
      this.theme === 'secondary'
        ? 'bg-white text-primary'
        : this.theme === 'destroy'
          ? 'bg-destroy text-white'
          : 'bg-primary text-white';
    return cn(colorClass);
  }
}
