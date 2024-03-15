import { v4 as uuidv4 } from 'uuid';

// TODO: Models encapsulates the properties and methods related to a specific entity or concept.
// TODO: Models are used to organize and manage data, 
//       making it easier to manipulate and interact with in different parts of the application.
export class NoteDetails {
    noteId: string;
    noteTitle: string;
    noteContent: string;
    constructor(noteTitle: string, noteContent: string) {
        this.noteTitle = noteTitle;
        this.noteContent = noteContent;
        this.noteId = uuidv4();
    }
}