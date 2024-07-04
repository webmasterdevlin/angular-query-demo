import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { EndPoints } from 'src/app/configs/axios.config';
import { Contact } from 'src/app/models';
import { names } from 'src/app/queryKey';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-contact-id',
  standalone: true,
  imports: [JsonPipe],
  template: `<section>
    <h1>Contact ID Page Works! {{ id }}</h1>
    <h2>{{ contactId.data() | json }}</h2>
  </section>`,
})
export class ContactIdComponent {
  private route = inject(ActivatedRoute);
  private http = inject(HttpService);

  contactIdQuery: any;

  id: string = '';
  private paramMapSubscription: any;
  contactId: any;

  ngOnInit(): void {
    this.paramMapSubscription = this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.id = id;
        // Call any methods that need to run when ID changes
        // For example, to fetch new data based on the new ID
        this.contactIdQuery = injectQuery(() => ({
          queryKey: [names.contacts, this.id],
          queryFn: async () => {
            const { data } = await this.http.getById<Contact>(
              EndPoints.contacts,
              this.id,
            );
            return data;
          },
        }));
        this.contactId = this.contactIdQuery;
      }
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    this.paramMapSubscription.unsubscribe();
  }
}
