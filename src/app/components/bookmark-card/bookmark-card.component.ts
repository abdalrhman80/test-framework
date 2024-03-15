import { BookmarkDetails } from 'src/app/models/bookmark-details.model';
import { BookmarkService } from './../../services/bookmark.service';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-bookmark-card',
  templateUrl: './bookmark-card.component.html',
  styleUrls: ['./bookmark-card.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class BookmarkCardComponent implements OnInit {
  @Input() bookmark: any
  @ViewChild('OptionsMenu') OptionsMenu: any
  bookmarks: BookmarkDetails[] = []
  menuItems: MenuItem[] | undefined;
  bookmarkId: string = ''
  bookmarkTittle: string = ''
  bookmarkUrl: string = ''
  faviconError: boolean = false

  constructor(
    private _BookmarkService: BookmarkService,
    private _Router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }
  ngOnInit(): void {
    this.menuItems = [
      {
        label: 'Edit',
        icon: 'fa-solid fa-edit',
        command: () => this._Router.navigate(['bookmarks/updateBookmark', this.bookmarkId, this.bookmarkTittle, this.bookmarkUrl])
      },
      {
        label: 'Delete',
        icon: 'fa-solid fa-trash',
        command: () => this.deleteTodo(this.bookmarkId)
      }
    ];
  }
  showOptions(id: string, title: string, url: string, event: Event) {
    this.OptionsMenu.toggle(event);
    this.bookmarkId = id
    this.bookmarkTittle = title
    this.bookmarkUrl = url
  }
  deleteTodo(id: string) {
    this.confirmationService.confirm({
      target: event?.target as EventTarget,
      message: 'Do you want to delete this note?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text rounded py-2 px-3",
      rejectButtonStyleClass: "p-button-text p-button-text rounded py-2 px-3",
      acceptIcon: "none",
      rejectIcon: "none",
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Bookmark deleted' });
        setTimeout(() => {
          this._BookmarkService.deleteBookmark(id)
        }, 1000)
      },
      reject: () => this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' })
    });
  }

}
