import { BookmarkDetails } from './../models/bookmark-details.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {
  bookmarkList: BookmarkDetails[] = []
  constructor() { }

  getBookmarksFromLocalStorage() {
    if (localStorage.getItem("bookmarks"))
      this.bookmarkList = JSON.parse(localStorage.getItem("bookmarks") || '{}')
  }

  setBookmarksToLocalStorage(data: any) {
    localStorage.setItem("bookmarks", JSON.stringify(data))
  }

  getBookmarks(): BookmarkDetails[] {
    this.getBookmarksFromLocalStorage()
    return this.bookmarkList;
  }

  getSpecificBookmark(id: string) {
    return this.bookmarkList.find(bookmarkItem => bookmarkItem.bookmarkId === id)
  }

  addBookmark(bookmark: BookmarkDetails) {
    this.bookmarkList.push(bookmark)
    this.setBookmarksToLocalStorage(this.bookmarkList)
  }

  deleteBookmark(id: string) {
    const bookmarkIndex = this.bookmarkList.findIndex(bookmarkItem => bookmarkItem.bookmarkId === id)
    this.bookmarkList.splice(bookmarkIndex, 1)
    this.setBookmarksToLocalStorage(this.bookmarkList)
  }

  editBookmark(id: string, updatedBookmark: Partial<BookmarkDetails>) {
    const bookmark = this.getSpecificBookmark(id)
    if (bookmark)
      Object.assign(bookmark, updatedBookmark)
    this.setBookmarksToLocalStorage(this.bookmarkList)
  }
}
