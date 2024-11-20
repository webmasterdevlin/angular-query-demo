import { Component } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-spinner',
  imports: [SharedModule],
  styles: ``,
  template: `<div
    class="inline-block animate-spin pl-3 pr-3 opacity-100 transition-all delay-300 duration-500"
  >
    🌀
  </div>`,
})
export class SpinnerComponent {}
