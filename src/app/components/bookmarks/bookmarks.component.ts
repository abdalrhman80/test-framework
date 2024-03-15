import { BookmarkDetails } from 'src/app/models/bookmark-details.model';
import { BookmarkService } from './../../services/bookmark.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit, OnDestroy {
  bookmarks: BookmarkDetails[] = []
  constructor(private _BookmarkService: BookmarkService) { }

  ngOnInit(): void {
    $('.bookmarks').fadeOut(0).fadeIn(500);
    this.bookmarks = this._BookmarkService.getBookmarks()
  }
  drop(event: CdkDragDrop<BookmarkDetails[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    this._BookmarkService.setBookmarksToLocalStorage(event.container.data)
  }

  ngOnDestroy(): void {
    $('.bookmarks').fadeOut(500).fadeIn(0);
  }
}
