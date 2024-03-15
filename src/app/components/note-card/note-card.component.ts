import { NoteService } from './../../services/note.service';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class NoteCardComponent {
  @Input() note: any;
  updateNoteTitle: string = ''
  updateNoteContent: string = ''
  updateNoteId: string = ''
  visible: boolean = false;

  updateDetails: FormGroup = new FormGroup({
    noteTitle: new FormControl(null, [Validators.required]),
    noteContent: new FormControl()
  });

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private _NoteService: NoteService
  ) { }

  deleteNote(event: Event, id: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text rounded py-2 px-3",
      rejectButtonStyleClass: "p-button-text p-button-text rounded py-2 px-3",
      acceptIcon: "none",
      rejectIcon: "none",
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
        setTimeout(() => {
          this._NoteService.deleteNote(id)
        }, 1500)
      },
      reject: () => this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' })
    });
  }
}
