import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TodoDetails } from 'src/app/models/todo-details.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class AddTodoComponent {
  addTodoForm: FormGroup = new FormGroup({
    todoTitle: new FormControl(null, [Validators.required]),
  })
  constructor(
    private messageService: MessageService,
    public _Router: Router,
    private _TodoService: TodoService
  ) { }

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Add new note' });
  }

  addNewTodo(form: FormGroup) {
    if (form.status === 'VALID') {
      const todo = new TodoDetails(form.value.todoTitle);
      this._TodoService.addTodo(todo);
      this.showSuccess();
      form.reset();
      setTimeout(() => {
        this._Router.navigate(['/todos']);
      }, 1000)
    }
  }

  
}
