import { Component, inject, signal } from '@angular/core';
import {
  injectQuery,
  keepPreviousData,
} from '@tanstack/angular-query-experimental';
import { CommodityService } from '../services/commodity.service';
import { lastValueFrom } from 'rxjs';
import { names } from '../state/server/queryKey';
import { SpinnerComponent } from '../components/spinner.component';

@Component({
  selector: 'app-pagination',
  imports: [SpinnerComponent],
  template: `<h2>Pagination (Page {{ page() }})</h2>
    <ul
      class="grid list-none grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
    >
      @for (commodity of commoditiesQuery.data()?.data; track commodity.id) {
        <li class="flex flex-col rounded-md bg-white p-4 shadow-md">
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
        </li>
      }
    </ul>
    <div class="flex items-center gap-3">
      <button
        [disabled]="page() === 1"
        class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        (click)="setPage(page() - 1)"
      >
        Previous
      </button>
      <button
        [disabled]="
          commoditiesQuery.isRefetching() || !commoditiesQuery.data()?.next
        "
        class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        (click)="setPage(page() + 1)"
      >
        Next
      </button>
      @if (commoditiesQuery.isRefetching()) {
        <app-spinner></app-spinner>
      }
    </div>`,
})
export class PaginationComponent {
  #commoditiesService = inject(CommodityService);

  page = signal(1);
  pageSize = 10;

  commoditiesQuery = injectQuery(() => ({
    queryKey: [names.commodities, this.page()],
    queryFn: () =>
      lastValueFrom(
        this.#commoditiesService.getCommodities$(this.page(), this.pageSize),
      ),
    placeholderData: keepPreviousData, // Keep previous data on the UI while fetching the next page
    staleTime: 1000 * 60 * 1, // 1 minute
  }));

  setPage(page: number) {
    if (page < 1) return;

    this.page.set(page);
  }
}
