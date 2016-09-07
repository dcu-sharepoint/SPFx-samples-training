import {Component, Input} from '@angular/core';


// This class gets transpiled to a JavaScript IIFE containing an object model
@Component({
      selector: `list-component`,
      template:
      `<button (click)="addTodo()">Click</button>
        <ul>
          <li *ngFor="let todo of todos">
            {{ todo }}
          </li>
        </ul>`
    })
export default class ListComponent {
  @Input()
  todos: string[];

  constructor() {
    console.log('*** ListComponent constructor ***');
   // this.todos = todos;
  }

  public addTodo(): void {
   this.todos.push('feature 1');
  };
}
