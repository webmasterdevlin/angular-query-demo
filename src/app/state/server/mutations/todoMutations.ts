import { inject } from '@angular/core';
import { injectMutation } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { TodoService } from 'src/app/services/todo.service';
import { names } from '../queryKey';

export function addTodoMutation() {
  const todoService = inject(TodoService);

  return injectMutation(() => ({
    queryKey: [names.todos],
    mutationFn: (variables: string) =>
      lastValueFrom(todoService.postTodo$(variables)),
    onSuccess: (data) => {
      // commented out because we are using polling to refetch the data for demo purposes
      // this.queryClient.setQueryData<Todo[]>([names.todos], (cache: any) => {
      //   return cache ? [...cache, data] : [data];
      // });
    },
  }));
}
