import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { AngularQueryDevtools } from '@tanstack/angular-query-devtools-experimental';
import { SearchComponent } from './shared/components/search.component';
import { SubmitButtonComponent } from './shared/components/ui/submit-button.component';
import { ContactListComponent } from './shared/components/contact-list.component';
import { names } from './queryKey';
import { Contact } from './models';
import { HttpService } from './services/http.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    SearchComponent,
    SubmitButtonComponent,
    ContactListComponent,
    AngularQueryDevtools,
  ],
  template: `
    <div class="flex w-full flex-col sm:flex-row">
      <div
        class="flex h-1/3 w-full flex-col border-r border-gray bg-gray-light sm:h-auto sm:w-[18rem] md:w-[22rem]"
      >
        <div class="flex items-center gap-2 border-b border-gray px-8 py-4">
          <app-search />
          <app-submit-button (handleOnClick)="newContact()" theme="secondary"
            >New</app-submit-button
          >
        </div>
        <app-contact-list [contacts]="contacts.data() ?? []" />
        <div
          class="m-0 hidden flex-row items-center gap-2 border-t border-t-gray px-8 py-4 font-medium sm:flex"
        >
          <a class="flex items-center gap-2 text-black no-underline" href="/">
            Contacts
          </a>
        </div>
        <div class="flex border-t border-t-gray sm:hidden"></div>
      </div>
      <div class="w-full flex-1 px-16 py-8">
        <router-outlet />
      </div>
      <angular-query-devtools initialIsOpen />
    </div>
  `,
})
export class AppComponent {
  contactsQuery = injectQuery(() => ({
    queryKey: [names.contacts],
    queryFn: async () => {
      const { data } = await this.service.get<Contact[]>('contacts');
      return data;
    },
  }));

  contacts = this.contactsQuery;

  service = inject(HttpService);

  newContact() {
    alert('hello');
  }
}
