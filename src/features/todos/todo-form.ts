import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  inject,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

export interface CreateTodoInput {
  title: string;
}

@Component({
  selector: 'app-todo-form',
  imports: [ReactiveFormsModule],
  templateUrl: './todo-form.html',
  styleUrl: './todo-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoForm {
  private readonly fb = inject(FormBuilder);

  @Output() readonly addTodo = new EventEmitter<CreateTodoInput>();

  readonly form = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.maxLength(100)]],
  });

  get titleControl() {
    return this.form.controls.title;
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const title = this.titleControl.value.trim();

    if (!title) {
      this.titleControl.setErrors({ required: true });
      this.titleControl.markAsTouched();
      return;
    }

    this.addTodo.emit({ title });
    this.form.reset({ title: '' });
  }
}