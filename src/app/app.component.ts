import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { HttpClient } from '@angular/common/http';
import { AngularQueryDevtools } from '@tanstack/angular-query-devtools-experimental';
import { lastValueFrom } from 'rxjs';
import { NavBarComponent } from './shared/components/nav-bar.component';
import { FooterComponent } from './shared/components/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    NavBarComponent,
    FooterComponent,
    AngularQueryDevtools,
  ],
  template: `
    <app-nav-bar></app-nav-bar>
    <div class="container prose mx-auto">
      <router-outlet></router-outlet>
    </div>
    <app-footer></app-footer>
    <angular-query-devtools initialIsOpen />
  `,
})
export class AppComponent {}
// export class AppComponent implements OnInit {
//   objectToConvert = { name: 'John', age: 30 };
//   jsonString = JSON.stringify(this.objectToConvert);
//   http = inject(HttpClient);
//   id = signal(1);
//   enabled = signal(false);

//   info = injectQuery(() => ({
//     queryKey: ['todos', this.id()],
//     queryFn: async () => {
//       return lastValueFrom(
//         this.http.get<ITodo[]>('https://jsonplaceholder.typicode.com/todos')
//       );
//     },
//     enabled: this.enabled(),
//   }));
//   result = this.info.data();

//   fetch() {
//     this.info.refetch();
//   }

//   ngOnInit() {
//     this.info.refetch();
//   }
// }
