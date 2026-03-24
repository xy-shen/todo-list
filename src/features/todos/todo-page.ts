import { Component, signal, computed, inject, effect } from '@angular/core';
import { Todo } from './models/todo.model';
import { StorageService } from './services/todo-store.service';
import { TodoForm, CreateTodoInput } from './todo-form';
import { TodoList } from './todo-list';

@Component({
  selector: 'app-todo-page',
  standalone: true,
  imports: [TodoForm, TodoList],
  templateUrl: './todo-page.html',
  styleUrl: './todo-page.css',
})
export class TodoPage {
  private readonly storage = inject(StorageService);
  private readonly storageKey = 'todos';

  readonly todos = signal<Todo[]>(this.loadTodos());
  
  readonly totalCount = computed(() => this.todos().length);
  readonly completedCount = computed(
    () => this.todos().filter(todo => todo.completed).length
  );
  readonly remainingCount = computed(
    () => this.todos().filter(todo => !todo.completed).length
  );

  constructor() {
    effect(() => {
      this.storage.setItem(this.storageKey, this.todos());
    });
  }

  addTodo(input: CreateTodoInput): void {
    const newTodo: Todo = {
      id: Date.now(),
      title: input.title,
      completed: false,
    };

    this.todos.update(current => [newTodo, ...current]);
  }

  toggleTodo(id: number): void {
    this.todos.update(current =>
      current.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  }

  removeTodo(id: number): void {
    this.todos.update(current =>
      current.filter(todo => todo.id !== id)
    );
  }

  private loadTodos(): Todo[] {
    return this.storage.getItem<Todo[]>(this.storageKey) ?? [];
  }
}