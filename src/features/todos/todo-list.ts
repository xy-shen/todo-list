import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { TodoItem } from './todo-item';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo-list',
  imports: [TodoItem],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TodoList {
  @Input({ required: true }) todos: Todo[] = [];

  @Output() readonly toggleTodo = new EventEmitter<number>();
  @Output() readonly removeTodo = new EventEmitter<number>();

  trackByTodoId(_index: number, todo: Todo): number {
    return todo.id;
  }

  onToggleTodo(id: number): void {
    this.toggleTodo.emit(id);
  }

  onRemoveTodo(id: number): void {
    this.removeTodo.emit(id);
  }
}