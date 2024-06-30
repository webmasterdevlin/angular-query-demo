import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="my-5 bg-white">
      <pre class="font-bold">todos: 0, posts: 0</pre>
      <pre>combined posts and todos: 0</pre>
    </footer>
  `,
})
export class FooterComponent {}
