import {Component, ComponentResolver, NgZone, ViewContainerRef} from 'angular2/core';

// This class gets transpiled to a JavaScript IIFE containing an object model
export default class TodoAngular2Component {

  public static getAngular2Component(selectorId: string): any {
    // First we must decorate the constructable object (which will serve as our Component)
    // with metadata that tells Angular2 which CSS Selector to look for in the HTML and then bootstraps that element,
    // and how to render the Component's view inside the CSS Selector's element.
    return Component({
      selector: `ng2-webpart-${selectorId}`,
      template:
      `<p>{{description}}</p>
       <button (click)="addTodo()">Click</button>
       <ul>
         <li *ngFor="let todo of todos">
           {{ todo }}
         </li>
       </ul>`
    })
    // Now we must define the constructable object that will be our Component.
    // We wrap the constructable object in parenthesis to explicitly tell the parser to
    // expect an expression and not a declaration.
    // ***But more importantly, we wrap with parenthesis so that the IIFE
    // object model that is transpiled from the class declaration is
    // lexically scoped in this WebPart instance.
    (
      class AppComponent {
        public todos: string[];
        public description: string;

        constructor(private vcRef: ViewContainerRef, private resolver: ComponentResolver, private zone: NgZone) {
          this.todos = [];
          console.log(Reflect.getMetadata('annotations', AppComponent));
        }

        public addTodo(): void {
          console.log(this.todos);
          this.todos.push('feature 1');
        };
      }
    );
  }
}
