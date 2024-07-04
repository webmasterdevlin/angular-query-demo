import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-search-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg
      width="16"
      height="16"
      [ngClass]="className"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  `,
})
export class SearchIconComponent {
  @Input() className?: string;
}
