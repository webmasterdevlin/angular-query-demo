import { Component, inject } from '@angular/core';
import {
  injectQueryClient,
  injectInfiniteQuery,
} from '@tanstack/angular-query-experimental';
import { ComodityService } from '../services/comodity.service';
import { lastValueFrom } from 'rxjs';
import { names } from '../queryKey';
import { InViewDirective } from '../utilities/in-view.directive';

@Component({
  selector: 'app-infinite-scroll',
  standalone: true,
  imports: [InViewDirective],
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
            <pre appInView (inView)="onInView()">
Scroll down to load more..</pre
            >
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

  pageSize = 5;

  infiniteQuery = injectInfiniteQuery(() => ({
    queryKey: [names.comodities],
    queryFn: ({ pageParam }) => {
      return lastValueFrom(
        this.#comoditiesService.fetchComodity$(pageParam, this.pageSize),
      );
    },
    initialPageParam: 1,
    getPreviousPageParam: (firstPage) => firstPage.prev,
    getNextPageParam: (lastPage) => lastPage.next,
  }));

  onInView() {
    if (
      this.infiniteQuery.hasNextPage() &&
      !this.infiniteQuery.isFetchingNextPage()
    ) {
      this.infiniteQuery.fetchNextPage();
    }
  }
}
