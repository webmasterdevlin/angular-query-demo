import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: ` <h1
      class="inline-block bg-gradient-to-r from-red-500 to-amber-500 bg-clip-text text-transparent"
    >
      Tanstack Angular Query at NG-DE
    </h1>
    <h2>
      Powerful asynchronous state management for TS/JS, React, Solid, Vue,
      Svelte and and now in <span class="text-[#F40F55]">Angular</span>
    </h2>
    <h3 class="text-fuchsia-500">By: &commat;DevlinDuldulao</h3>`,
  styles: ``,
})
export class HomeComponent {}
