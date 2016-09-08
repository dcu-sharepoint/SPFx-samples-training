/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 *
 * Todo Angular2 component
 */

import {Component} from '@angular/core';

export default class TodoComponent {

    /**
     * Get the root component for the web part. Note, as per the current prototype
     * this component cannot use the declarative @Component directive.
     */
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

          public logTodos(): void {
            console.log(this.todos);
          }
        }
      );
    }
}
