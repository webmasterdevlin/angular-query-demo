import { Component } from '@angular/core';
import { SpinnerIconComponent } from './icons/spinner-icon.component';
import { SearchIconComponent } from './icons/search-icon.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [SpinnerIconComponent, SearchIconComponent],
  template: `
    <form role="search">
      <input
        class="w-full pl-8 outline-offset-1"
        aria-label="Search contacts"
        name="q"
        placeholder="Search"
        type="search"
      />
      <div aria-hidden className="absolute left-10 top-7">
        @if (searching) {
          <div className="h-fit w-fit animate-spin">
            <app-spinner-icon className="text-gray-dark" />
          </div>
        } @else {
          <app-search-icon className="text-gray-dark" />
        }
      </div>
    </form>
  `,
})
export class SearchComponent {
  searching = false;
}
