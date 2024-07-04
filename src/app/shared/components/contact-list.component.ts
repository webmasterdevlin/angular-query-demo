import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { matchSorter } from 'match-sorter';
import { ActivatedRoute } from '@angular/router';
import { Contact } from 'src/app/models';
import { ContactButtonComponent } from './contact-button.component';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [ContactButtonComponent],
  template: `
    <nav class="flex-1 overflow-auto px-8 py-4">
      @if (filteredContacts.length > 0) {
        <ul>
          @for (
            contact of filteredContacts;
            track contact.id;
            let idx = $index, e = $even
          ) {
            <li class="mx-1">
              <app-contact-button [contact]="contact"></app-contact-button>
            </li>
          }
        </ul>
      } @else {
        <p>
          <i>No contacts</i>
        </p>
      }
    </nav>
  `,
})
export class ContactListComponent implements OnChanges {
  @Input() contacts: Contact[] = [];
  filteredContacts: Contact[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['contacts']) {
      this.filterContacts();
    }
  }

  filterContacts(): void {
    const query = this.route.snapshot.queryParamMap.get('q') || '';
    this.filteredContacts = query
      ? matchSorter(this.contacts, query, {
          keys: ['first', 'last'],
        })
      : this.contacts;
  }
}
