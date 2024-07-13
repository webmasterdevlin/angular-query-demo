import { AngularQueryDevtools } from '@tanstack/angular-query-devtools-experimental';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './components/nav-bar.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  standalone: true,
  imports: [AngularQueryDevtools, RouterModule, NavBarComponent],
  template: `
    <app-nav-bar />
    <div
      class="container prose mx-auto mt-4 rounded-lg bg-gray-50 p-4 shadow-lg"
    >
      <router-outlet></router-outlet>
    </div>
    <angular-query-devtools initialIsOpen />
  `,
})
export class AppComponent {}
