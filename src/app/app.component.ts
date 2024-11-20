import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './components/nav-bar.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  providers: [],
  imports: [RouterModule, NavBarComponent],
  template: `
    <app-nav-bar />
    <div
      class="container prose mx-auto mt-4 rounded-lg bg-gray-50 p-4 shadow-lg"
    >
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent {}
