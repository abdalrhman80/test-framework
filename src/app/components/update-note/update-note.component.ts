import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class UpdateNoteComponent implements OnInit {
  updateNoteTitle: string = ''
  updateNoteContent: string = ''
  updateNoteId: string = ''
  updateDetails: FormGroup = new FormGroup({
    noteTitle: new FormControl(null, [Validators.required]),
    noteContent: new FormControl()
  });

  constructor(
    private messageService: MessageService,
    public _Router: Router,
    private _NoteService: NoteService,
    private _ActivatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe((param: any) => {
      this.updateNoteId = param['id']
      this.updateNoteTitle = param['title']
      this.updateNoteContent = param['content']
    })
    this.updateDetails.setValue({
      noteTitle: this.updateNoteTitle,
      noteContent: this.updateNoteContent == 'null' ? '' : this.updateNoteContent
    });
  }
  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Update note' });
  }
  updateNote(form: FormGroup) {
    if (form.status === 'VALID') {
      this._NoteService.editNote(this.updateNoteId, form.value)
      this.showSuccess();
      setTimeout(() => {
        form.reset();
        this._Router.navigate(['/notes']);
      }, 1000)
    }
  }
}
