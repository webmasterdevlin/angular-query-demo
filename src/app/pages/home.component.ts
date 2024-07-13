import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: ` <h1>Tanstack Angualr Query at NG-DE</h1>
    <h2>
      Powerful asynchronous state management for TS/JS, React, Solid, Vue,
      Svelte and and now in Angular
    </h2>
    <h3>By: &commat;DevlinDuldulao</h3>`,
  styles: ``,
})
export class HomeComponent {}
