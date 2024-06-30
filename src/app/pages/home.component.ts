import { Component, inject } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule],
  template: `
    <section>
      <h1>Tanstack Angular Query</h1>
      <div>todos left: 0</div>
      <div>posts left: 0</div>
    </section>
  `,
})
export class HomeComponent {}
