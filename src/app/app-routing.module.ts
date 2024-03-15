import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookmarksComponent } from './components/bookmarks/bookmarks.component';
import { TodosComponent } from './components/todos/todos.component';
import { NotesComponent } from './components/notes/notes.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AddNoteComponent } from './components/add-note/add-note.component';
import { UpdateNoteComponent } from './components/update-note/update-note.component';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { UpdateTodoComponent } from './components/update-todo/update-todo.component';
import { AddBookmarkComponent } from './components/add-bookmark/add-bookmark.component';
import { UpdateBookmarkComponent } from './components/update-bookmark/update-bookmark.component';

const routes: Routes = [
  { path: '', redirectTo: 'bookmarks', pathMatch: 'full' },
  { path: 'bookmarks', component: BookmarksComponent, title: 'Bookmarks' },
  { path: 'bookmarks/addBookmark', component: AddBookmarkComponent, title: 'Add Bookmark' },
  { path: 'bookmarks/updateBookmark/:id/:title/:url', component: UpdateBookmarkComponent, title: 'Update Bookmark' },
  { path: 'todos', component: TodosComponent, title: 'Todos' },
  { path: 'todos/addTodo', component: AddTodoComponent, title: 'Add Todo' },
  { path: 'todos/updateTodo/:id/:title', component: UpdateTodoComponent, title: 'Update Todo' },
  { path: 'notes', component: NotesComponent, title: 'Notes' },
  { path: 'notes/addNote', component: AddNoteComponent, title: 'Add Note' },
  { path: 'notes/updateNote/:id/:title/:content', component: UpdateNoteComponent, title: 'Update Note' },
  { path: '**', component: NotFoundComponent, title: 'Not Found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
