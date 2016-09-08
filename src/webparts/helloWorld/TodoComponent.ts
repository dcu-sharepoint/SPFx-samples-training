import {Component} from '@angular/core';
/* tslint:disable */
import ListComponent from './ListComponent';

export default class TodoComponent {
    public static getComponent(selectorId: string): any {
      return Component({
            selector: `ng2-webpart-${selectorId}`,
            template: `<p>Hello</p><button (click)="logTodos()">Log Todos</button> <list-component [todos]="todos"></list-component>`
      })(
        class TodoComponentTemp {
          public todos: string[] = [];
          public description: string;

          constructor() {
            console.log(Reflect.getMetadata('annotations', TodoComponent));
          }

          logTodos(): void {
            console.log(this.todos);
          }
        }
      );
    }
}
