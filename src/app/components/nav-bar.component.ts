import { Component } from '@angular/core';
import { pathNames } from '../app.routes';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [SharedModule],
  template: `
    <nav
      class="flex flex-wrap items-center justify-between border-b border-gray-300 bg-white px-4 py-2 capitalize"
    >
      <div class="block lg:hidden">
        <button
          (click)="isMenuOpen = !isMenuOpen"
          class="flex items-center rounded border border-gray-300 px-3 py-2 text-gray-700 hover:border-gray-400 hover:text-gray-900"
        >
          <svg
            class="h-3 w-3 fill-current"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0zM0 9h20v2H0zM0 15h20v2H0z" />
          </svg>
        </button>
      </div>
      <div
        [ngClass]="{ block: isMenuOpen, hidden: !isMenuOpen }"
        class="block w-full flex-grow lg:flex lg:w-auto lg:items-center"
      >
        <div class="text-sm lg:flex-grow">
          <a
            *ngFor="let item of items; trackBy: trackByFn"
            class="mr-4 mt-4 block text-gray-700 hover:text-rose-900 lg:mt-0 lg:inline-block"
            [routerLink]="item[1]"
            routerLinkActive="font-bold"
            >{{ item[0] }}</a
          >
        </div>
      </div>
    </nav>
  `,
})
export class NavBarComponent {
  items = pathNames;
  isMenuOpen = false;

  trackByFn(index: number, item: any): any {
    return item[0];
  }
}
