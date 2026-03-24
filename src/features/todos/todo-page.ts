import { Component, signal, computed } from '@angular/core';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo-page',
  standalone: true,
  imports: [],
  templateUrl: './todo-page.html',
  styleUrl: './todo-page.css',
})
export class TodoPage {
  readonly todos = signal<Todo[]>([
    { id: 1, title: 'Learn Angular basics', completed: true },
    { id: 2, title: 'Build todo page', completed: false },
    { id: 3, title: 'Add todo form later', completed: false },
  ]);

  readonly totalCount = computed(() => this.todos().length);
  readonly completedCount = computed(
    () => this.todos().filter(todo => todo.completed).length
  );
  readonly remainingCount = computed(
    () => this.todos().filter(todo => !todo.completed).length
  );

  trackByTodoId(_index: number, todo: Todo): number {
    return todo.id;
  }
}