import { Component, inject, signal, OnInit } from '@angular/core';
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
import { InViewDirective } from '../utilities/in-view.directive';

@Component({
  selector: 'app-infinite-scroll',
  standalone: true,
  imports: [ScrollBottomDirective, InViewDirective],
  template: `
    <h2>Infinite Scroll</h2>
    @switch (infiniteQuery.status()) {
      @case ('pending') {
        <pre>Loading.. Please wait..</pre>
      }
      @case ('error') {
        <pre>{{ infiniteQuery.error() }}</pre>
      }
      @default {
        @for (comodityPage of infiniteQuery.data()?.pages; track comodityPage) {
          <div>
            @for (comodity of comodityPage.data; track comodity.id) {
              <div class="mb-5 flex flex-col rounded-md bg-white p-4 shadow-md">
                <span class="text-lg font-semibold">
                  Name:
                  {{ comodity.name }}
                </span>
                <span class="text-gray-600">
                  Price:
                  {{ comodity.price }}
                </span>
                <span class="text-gray-600">
                  Quantity:
                  {{ comodity.quantity }}
                </span>
              </div>
            }
          </div>
        }
        @if (infiniteQuery.isFetchingNextPage()) {
          <pre>Loading more..</pre>
        } @else {
          @if (infiniteQuery.hasNextPage()) {
            <pre>Scroll down to load more..</pre>
            <!-- Place the directive here to trigger loading more pages -->
            <div appInView (inView)="onInView()"></div>
          } @else {
            <pre>Nothing more to load..</pre>
          }
        }
      }
    }
  `,
})
export class InfiniteScrollComponent {
  queryClient = injectQueryClient();
  #comoditiesService = inject(ComodityService);

  page = signal(1);
  pageSize = 10;

  infiniteQuery = injectInfiniteQuery(() => ({
    queryKey: [names.comodities],
    queryFn: ({ pageParam }) => {
      console.log('Fetching data...', pageParam);
      return lastValueFrom(
        this.#comoditiesService.fetchComodity$(pageParam, this.pageSize),
      );
    },
    initialPageParam: 1,
    getPreviousPageParam: (firstPage) => firstPage.prev,
    getNextPageParam: (lastPage) => lastPage.next,
  }));

  setPage(page: number) {
    if (page < 1) return;

    this.page.set(page + this.pageSize);
  }

  onScrollBottom() {
    this.infiniteQuery.fetchNextPage();
  }

  onInView() {
    if (
      this.infiniteQuery.hasNextPage() &&
      !this.infiniteQuery.isFetchingNextPage()
    ) {
      this.infiniteQuery.fetchNextPage();
    }
  }
}
