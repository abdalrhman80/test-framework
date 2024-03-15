import { BookmarkService } from './../../services/bookmark.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BookmarkDetails } from 'src/app/models/bookmark-details.model';

@Component({
  selector: 'app-add-bookmark',
  templateUrl: './add-bookmark.component.html',
  styleUrls: ['./add-bookmark.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class AddBookmarkComponent {
  addBookmarkForm: FormGroup = new FormGroup({
    bookmarkTitle: new FormControl(null, [Validators.required]),
    bookmarkUrl: new FormControl(null, [Validators.required, Validators.pattern(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/)]),
  })
  constructor(
    public _Router: Router,
    private messageService: MessageService,
    public _BookmarkService: BookmarkService
  ) { }
  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Add new note' });
  }

  addNewBookmark(form: FormGroup) {
    if (form.status === 'VALID') {
      const bookmark = new BookmarkDetails(form.value.bookmarkTitle, form.value.bookmarkUrl);
      this._BookmarkService.addBookmark(bookmark);
      this.showSuccess();
      setTimeout(() => {
        form.reset();
        this._Router.navigate(['/bookmarks']);
      }, 1000)
    }

  }
}
