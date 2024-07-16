import { Component, inject, signal } from '@angular/core';
import {
  injectQuery,
  keepPreviousData,
} from '@tanstack/angular-query-experimental';
import { CommodityService } from '../services/commodity.service';
import { lastValueFrom } from 'rxjs';
import { names } from '../queryKey';

@Component({
  selector: 'app-pagination',
  standalone: true,
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
      <div
        class="h-5 w-5 animate-spin rounded-full border-b-2 border-gray-900"
      ></div>
    }
  </div>`,
})
export class PaginationComponent {
  #commoditiesService = inject(CommodityService);

  page = signal(1);
  pageSize = 10;

  commoditiesQuery = injectQuery(() => ({
    queryKey: [names.comodities, this.page()],
    queryFn: () =>
      lastValueFrom(
        this.#commoditiesService.fetchCommodity$(this.page(), this.pageSize),
      ),
    placeholderData: keepPreviousData,
    staleTime: 5000,
  }));

  setPage(page: number) {
    if (page < 1) return;

    this.page.set(page);
  }
}
