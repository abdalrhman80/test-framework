import { BookmarkService } from './../../services/bookmark.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';


@Component({
  selector: 'app-update-bookmark',
  templateUrl: './update-bookmark.component.html',
  styleUrls: ['./update-bookmark.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class UpdateBookmarkComponent implements OnInit {
  bookmarkId: string = ''
  bookmarkTittle: string = ''
  bookmarkUrl: string = ''
  updateBookmarkForm: FormGroup = new FormGroup({
    bookmarkTitle: new FormControl(null, [Validators.required]),
    bookmarkUrl: new FormControl(null, [Validators.required, Validators.pattern(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/)]),
  })
  constructor(
    public _Router: Router,
    private messageService: MessageService,
    private _ActivatedRoute: ActivatedRoute,
    private _BookmarkService: BookmarkService
  ) { }
  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe((param: any) => {
      this.bookmarkId = param['id']
      this.bookmarkTittle = param['title']
      this.bookmarkUrl = param['url']
      this.updateBookmarkForm.setValue({ bookmarkTitle: this.bookmarkTittle, bookmarkUrl: this.bookmarkUrl })
    })
  }
  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Update note' });
  }
  updateBookmark(form: FormGroup) {
    if (form.status === 'VALID') {
      this._BookmarkService.editBookmark(this.bookmarkId, form.value)
      this.showSuccess();
      setTimeout(() => {
        form.reset();
        this._Router.navigate(['/bookmarks']);
      }, 1000)
    }
  }
}
