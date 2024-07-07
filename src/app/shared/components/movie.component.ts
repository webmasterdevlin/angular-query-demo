import { HttpClient } from '@angular/common/http';
import {
  Component,
  ChangeDetectionStrategy,
  Output,
  Input,
  signal,
  inject,
  EventEmitter,
} from '@angular/core';
import {
  injectQuery,
  injectQueryClient,
} from '@tanstack/angular-query-experimental';
import { fromEvent, lastValueFrom, takeUntil } from 'rxjs';
import { Post } from 'src/app/models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'post',
  standalone: true,
  template: `
    <div>
      <div>
        <a (click)="setPostId.emit(-1)" href="#"> Back </a>
      </div>
      @if (postQuery.status() === 'pending') {
        Loading...
      } @else if (postQuery.status() === 'error') {
        Error: {{ postQuery.error()?.message }}
      }
      @if (postQuery.data(); as post) {
        <h1>{{ post.title }}</h1>
        <div>
          <p>{{ post.body }}</p>
        </div>
        @if (postQuery.isFetching()) {
          Background Updating...
        }
      }
    </div>
  `,
})
export class PostComponent {
  @Output() setPostId = new EventEmitter<number>();

  // Until Angular supports signal-based inputs, we have to set a signal
  @Input({ required: true, alias: 'postId' })
  set _postId(value: number) {
    this.postId.set(value);
  }
  postId = signal(0);
  httpClient = inject(HttpClient);

  getPost$ = (postId: number) => {
    return this.httpClient.get<Post>(
      `https://jsonplaceholder.typicode.com/posts/${postId}`,
    );
  };

  postQuery = injectQuery(() => ({
    enabled: this.postId() > 0,
    queryKey: ['post', this.postId()],
    queryFn: async (context): Promise<Post> => {
      // Cancels the request when component is destroyed before the request finishes
      const abort$ = fromEvent(context.signal, 'abort');
      return lastValueFrom(
        this.getPost$(this.postId()).pipe(takeUntil(abort$)),
      );
    },
  }));

  queryClient = injectQueryClient();
}
