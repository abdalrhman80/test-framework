import { v4 as uuidv4 } from 'uuid';

// TODO: Models encapsulates the properties and methods related to a specific entity or concept.
// TODO: Models are used to organize and manage data, 
//       making it easier to manipulate and interact with in different parts of the application.
export class BookmarkDetails {
    bookmarkId: string;
    constructor(public bookmarkTitle: string, public bookmarkUrl: string) {
        this.bookmarkId = uuidv4();
    }
}
