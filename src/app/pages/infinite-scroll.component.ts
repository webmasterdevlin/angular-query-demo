import { Component, inject, signal } from '@angular/core';
import {
  injectQuery,
  injectQueryClient,
  injectInfiniteQuery,
  keepPreviousData,
} from '@tanstack/angular-query-experimental';
import { ComodityService } from '../services/comodity.service';
import { lastValueFrom } from 'rxjs';
import { names } from '../queryKey';
import { ScrollBottomDirective } from '../utilities/scroll-bottom.directive';

@Component({
  selector: 'app-infinite-scroll',
  standalone: true,
  imports: [ScrollBottomDirective],
  template: `
    <div appScrollBottom (scrolledToBottom)="onScrollBottom()">
      <h2>Infinite Scroll</h2>
    </div>
  `,
})
export class InfiniteScrollComponent {
  queryClient = injectQueryClient();
  #comoditiesService = inject(ComodityService);

  page = signal(1);
  pageSize = 5;

  comoditiesQuery = injectInfiniteQuery(() => ({
    queryKey: [names.comodities],
    queryFn: ({ pageParam }) => {
      return lastValueFrom(
        this.#comoditiesService.fetchComodity$(this.page(), this.pageSize),
      );
    },
    initialPageParam: 0,
    getPreviousPageParam: (firstPage) => firstPage.prev,
    getNextPageParam: (lastPage) => lastPage.next,
  }));

  setPage(page: number) {
    if (page < 1) return;

    this.page.set(page + this.pageSize);
  }

  onScrollBottom() {
    alert('Scrolled to bottom!');
  }
}
