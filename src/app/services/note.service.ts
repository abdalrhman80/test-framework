import { Injectable } from '@angular/core';
import { NoteDetails } from '../models/note-details.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  notesList: NoteDetails[] = []

  constructor() { }
  getNotesFromLocalStorage() {
    if (localStorage.getItem('notes'))
      this.notesList = JSON.parse(localStorage.getItem('notes') || '{}');
  }
  setNotesToLocalStorage(data: any) {
    localStorage.setItem('notes', JSON.stringify(data))
  }
  getNotes(): NoteDetails[] {
    this.getNotesFromLocalStorage()
    return this.notesList
  }
  getSpecificNote(id: string) {
    return this.notesList.find(noteItem => noteItem.noteId === id)
  }
  addNote(note: NoteDetails) {
    this.notesList.push(note);
    this.setNotesToLocalStorage(this.notesList)
  }
  deleteNote(id: string) {
    const noteIndex = this.notesList.findIndex(note => note.noteId === id)
    if (noteIndex != -1) {
      this.notesList.splice(noteIndex, 1)
      this.setNotesToLocalStorage(this.notesList)
    }
  }

  // TODO: The Partial<T> type allows you to create a new type with all the properties of type T,
  //       but with all properties set to optional.
  editNote(id: string, updatedNote: Partial<NoteDetails>) {
    const note = this.getSpecificNote(id)
    if (note) {
      Object.assign(note, updatedNote)
      this.setNotesToLocalStorage(this.notesList)
    }
  }
}
