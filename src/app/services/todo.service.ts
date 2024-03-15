import { Injectable } from '@angular/core';
import { TodoDetails } from '../models/todo-details.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todoList: TodoDetails[] = []
  constructor() { }
  getTodosFromLocalStorage() {
    if (localStorage.getItem('todos'))
      this.todoList = JSON.parse(localStorage.getItem('todos') || '{}')
  }
  setTodosTodosLocalStorage(data: any) {
    localStorage.setItem('todos', JSON.stringify(data))
  }
  getTodos() {
    this.getTodosFromLocalStorage()
    return this.todoList;
  }
  getSpecificTodo(id: string) {
    return this.todoList.find(todoItem => todoItem.todoId === id)
  }
  addTodo(todo: TodoDetails) {
    this.todoList.push(todo)
    this.setTodosTodosLocalStorage(this.todoList)
  }
  deleteTodo(id: string) {
    const todoIndex = this.todoList.findIndex(todoItem => todoItem.todoId === id)
    if (todoIndex != -1) {
      this.todoList.splice(todoIndex, 1)
      this.setTodosTodosLocalStorage(this.todoList)
    }
  }
  editTodo(id: string, updatedTodo: Partial<TodoDetails>) {
    const todo = this.getSpecificTodo(id)
    if (todo) {
      Object.assign(todo, updatedTodo)
      this.setTodosTodosLocalStorage(this.todoList)
    }
  }
  makeCompleted(id: string) {
    const todo = this.getSpecificTodo(id)
    if (todo) {
      todo.isCompleted = !todo.isCompleted
      this.setTodosTodosLocalStorage(this.todoList)
    }
  }
}
