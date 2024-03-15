import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { NoteService } from 'src/app/services/note.service';
import { NoteDetails } from 'src/app/models/note-details.model';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class AddNoteComponent implements OnInit {
  notes: NoteDetails[] = [];
  noteDetails: FormGroup = new FormGroup({
    noteTitle: new FormControl(null, [Validators.required]),
    noteContent: new FormControl()
  });

  constructor(
    private messageService: MessageService,
    public _Router: Router,
    private _NoteService: NoteService
  ) { }

  ngOnInit(): void {
    $('.notes').fadeOut(0).fadeIn(300);
    this.notes = this._NoteService.getNotes();
  }
  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Add new note' });
  }

  addNewNote(form: FormGroup) {
    if (form.status === 'VALID') {
      const note = new NoteDetails(form.value.noteTitle, form.value.noteContent);
      this._NoteService.addNote(note);
      this.showSuccess();
      setTimeout(() => {
        form.reset();
        this._Router.navigate(['/notes']);
      }, 1000)
    }
  }
}
