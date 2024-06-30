import { Component, inject } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule],
  template: `
    <div>
      <h1>Angular Query</h1>
      <div>todos left: 0</div>
      <div>posts left: 0</div>
    </div>
  `,
})
export class HomeComponent {}
