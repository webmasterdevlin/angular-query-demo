import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SharedModule } from '../shared.module';
import { MenuComponent } from './menu.component';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [SharedModule, MenuComponent],
  template: `
    <nav>
      <app-menu label="home" (handleClick)="to('/')"></app-menu>
      <app-menu label="todos" (handleClick)="to('todos')"></app-menu>
      <app-menu label="posts" (handleClick)="to('posts')"></app-menu>
    </nav>
  `,
})
export class NavBarComponent {
  private _router = inject(Router);

  async to(url: string) {
    await this._router.navigateByUrl(url);
  }
}
