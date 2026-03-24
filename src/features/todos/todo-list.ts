import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo-list',
  imports: [],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TodoList {
  @Input({ required: true }) todos: Todo[] = [];

  trackByTodoId(_index: number, todo: Todo): number {
    return todo.id;
  }
}