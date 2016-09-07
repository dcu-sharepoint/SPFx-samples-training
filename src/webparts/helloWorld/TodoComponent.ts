import {Component} from '@angular/core';
/* tslint:disable */
import ListComponent from './ListComponent';

// This class gets transpiled to a JavaScript IIFE containing an object model
@Component({
      selector: `ng2-webpart`,
      template:
      `<p>Hello</p>
      <list-component [todos]="todos"></list-component>`
})
export default class TodoComponent {


    public todos: string[];
    public description: string;

    constructor() {
      this.todos = [];
      console.log(Reflect.getMetadata('annotations', TodoComponent));
    }
}
