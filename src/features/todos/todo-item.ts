import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo-item',
  imports: [],
  templateUrl: './todo-item.html',
  styleUrl: './todo-item.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TodoItem {
  @Input({ required: true }) todo!: Todo;

  @Output() readonly toggle = new EventEmitter<number>();
  @Output() readonly remove = new EventEmitter<number>();

  onToggle(): void {
    this.toggle.emit(this.todo.id);
  }

  onRemove(): void {
    this.remove.emit(this.todo.id);
  }
}