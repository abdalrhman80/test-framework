import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TodoService } from 'src/app/services/todo.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-update-todo',
  templateUrl: './update-todo.component.html',
  styleUrls: ['./update-todo.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class UpdateTodoComponent implements OnInit {
  todoTitle: string = ''
  todoId: string = ''
  updateTodoForm: FormGroup = new FormGroup({
    todoTitle: new FormControl(null, [Validators.required]),
  })
  constructor(
    private messageService: MessageService,
    public _Router: Router,
    private _TodoService: TodoService,
    private _ActivatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe((param: any) => {
      this.todoTitle = param['title']
      this.todoId = param['id']
      this.updateTodoForm.setValue({ todoTitle: this.todoTitle })
    })
  }
  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Update note' });
  }

  editTodo(form: FormGroup) {
    if (form.status == 'VALID') {
      this._TodoService.editTodo(this.todoId, form.value)
      this.showSuccess();
      setTimeout(() => {
        form.reset();
        this._Router.navigate(['/todos']);
      }, 1000)
    }
  }
}
