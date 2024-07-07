import { HttpClient } from '@angular/common/http';
import {
  Component,
  ChangeDetectionStrategy,
  Output,
  inject,
  EventEmitter,
} from '@angular/core';
import {
  injectQuery,
  injectQueryClient,
} from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { Post } from 'src/app/models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'posts',
  standalone: true,
  template: `<div>
    <h1>Posts</h1>
    @switch (postsQuery.status()) {
      @case ('pending') {
        Loading...
      }
      @case ('error') {
        Error: {{ postsQuery.error()?.message }}
      }
      @default {
        <div class="todo-container">
          @for (post of postsQuery.data(); track post.id) {
            <p>
              <!--          We can access the query data here to show bold links for-->
              <!--          ones that are cached-->
              <a
                href="#"
                (click)="setPostId.emit(post.id)"
                [style]="
                  queryClient.getQueryData(['post', post.id])
                    ? {
                        fontWeight: 'bold',
                        color: 'green',
                      }
                    : {}
                "
                >{{ post.title }}</a
              >
            </p>
          }
        </div>
      }
    }
    <div>
      @if (postsQuery.isFetching()) {
        Background Updating...
      }
    </div>
  </div> `,
})
export class PostsComponent {
  @Output() setPostId = new EventEmitter<number>();

  posts$ = inject(HttpClient).get<Array<Post>>(
    'https://jsonplaceholder.typicode.com/posts',
  );

  postsQuery = injectQuery(() => ({
    queryKey: ['posts'],
    queryFn: () => lastValueFrom(this.posts$),
  }));

  queryClient = injectQueryClient();
}
