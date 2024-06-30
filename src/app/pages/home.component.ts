import { Component, inject } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule],
  template: `
    <section>
      <h2>home</h2>
      <div>todos left: 0</div>
      <div>posts left: 0</div>
    </section>
  `,
})
export class HomeComponent {}
