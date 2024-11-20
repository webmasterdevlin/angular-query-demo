import { Component, inject } from '@angular/core';
import { injectInfiniteQuery } from '@tanstack/angular-query-experimental';
import { CommodityService } from '../services/commodity.service';
import { lastValueFrom } from 'rxjs';
import { names } from '../state/server/queryKey';
import { InViewDirective } from '../utilities/in-view.directive';

@Component({
  selector: 'app-infinite-scroll',
  imports: [InViewDirective],
  template: `
    <h2>Infinite Scroll</h2>
    @if (infiniteQuery.isFetchingPreviousPage()) {
      <pre>Loading previous..</pre>
    } @else {
      @if (infiniteQuery.hasPreviousPage()) {
        <pre appInView (inView)="onPreviousPage()">
Scroll up to load previous..</pre
        >
      }
    }
    @switch (infiniteQuery.status()) {
      @case ('pending') {
        <pre>Loading.. Please wait..</pre>
      }
      @case ('error') {
        <pre>{{ infiniteQuery.error()?.message }}</pre>
      }
      @default {
        @for (
          commodityPage of infiniteQuery.data()?.pages;
          track commodityPage
        ) {
          <div>
            @for (commodity of commodityPage.data; track commodity.id) {
              <div class="mb-5 flex flex-col rounded-md bg-white p-4 shadow-md">
                <span class="text-lg font-semibold">
                  Name:
                  {{ commodity.name }}
                </span>
                <span class="text-gray-600">
                  Price:
                  {{ commodity.price }}
                </span>
                <span class="text-gray-600">
                  Quantity:
                  {{ commodity.quantity }}
                </span>
              </div>
            }
          </div>
        }
        @if (infiniteQuery.isFetchingNextPage()) {
          <pre>Loading more..</pre>
        } @else {
          @if (infiniteQuery.hasNextPage()) {
            <pre appInView (inView)="onNextPage()">
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
  #commoditiesService = inject(CommodityService);

  pageSize = 7;

  infiniteQuery = injectInfiniteQuery(() => ({
    queryKey: [names.commodities],
    queryFn: ({ pageParam }) => {
      return lastValueFrom(
        this.#commoditiesService.getCommodities$(pageParam, this.pageSize),
      );
    },
    initialPageParam: 1,
    getPreviousPageParam: (firstPage) => firstPage.prev ?? undefined,
    getNextPageParam: (lastPage) => lastPage.next ?? undefined,
    maxPages: 3,
  }));

  async onNextPage() {
    if (
      this.infiniteQuery.hasNextPage() &&
      !this.infiniteQuery.isFetchingNextPage()
    ) {
      await this.infiniteQuery.fetchNextPage();
    }
  }

  async onPreviousPage() {
    if (
      this.infiniteQuery.hasPreviousPage() &&
      !this.infiniteQuery.isFetchingPreviousPage()
    ) {
      await this.infiniteQuery.fetchPreviousPage();
    }
  }
}
