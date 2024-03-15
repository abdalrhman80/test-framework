import { TodoService } from 'src/app/services/todo.service';
import { Component, Input } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class TodoCardComponent {
  @Input() todo: any;
  constructor(
    public _TodoService: TodoService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  deleteTodo(event: Event, id: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this note?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text rounded py-2 px-3",
      rejectButtonStyleClass: "p-button-text p-button-text rounded py-2 px-3",
      acceptIcon: "none",
      rejectIcon: "none",
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Note deleted' });
        setTimeout(() => {
          this._TodoService.deleteTodo(id)
        }, 1000)
      },
      reject: () => this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' })
    });
  }

}
