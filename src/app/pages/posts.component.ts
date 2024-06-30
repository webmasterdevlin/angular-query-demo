import { Component, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { SharedModule } from '../shared/shared.module';

@UntilDestroy()
@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [SharedModule],
  template: `<section>
    <h1>Posts Works!</h1>
  </section>`,
})
export class PostsComponent implements OnInit {
  ngOnInit(): void {
    console.log('PostsComponent initialized');
  }
}
