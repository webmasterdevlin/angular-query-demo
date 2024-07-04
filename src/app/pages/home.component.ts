import { Component, inject } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule],
  template: `
    <div className="m-8 flex flex-col gap-2 text-center text-gray-dark">
      <h1>Tanstack Angular Query Demo</h1>
    </div>
  `,
})
export class HomeComponent {}
