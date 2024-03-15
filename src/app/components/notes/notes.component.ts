import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { NoteService } from './../../services/note.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { NoteDetails } from 'src/app/models/note-details.model';
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  providers: [MessageService]
})
export class NotesComponent implements OnInit, OnDestroy {
  notes: NoteDetails[] = [];

  constructor(private _NoteService: NoteService) { }

  ngOnInit(): void {
    $('.notes').fadeOut(0).fadeIn(300);
    this.notes = this._NoteService.getNotes();
  }

  drop(event: CdkDragDrop<NoteDetails[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    this._NoteService.setNotesToLocalStorage(event.container.data)
  }

  ngOnDestroy(): void {
    $('.notes').fadeOut(300).fadeIn(0);
  }
}
