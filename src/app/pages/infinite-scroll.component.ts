import { Component } from '@angular/core';
import { injectQueryClient } from '@tanstack/angular-query-experimental';

@Component({
  selector: 'app-infinite-scroll',
  standalone: true,
  template: `<p>infinite-scroll works!</p>`,
  styles: ``,
})
export class InfiniteScrollComponent {
  queryClient = injectQueryClient();
}
