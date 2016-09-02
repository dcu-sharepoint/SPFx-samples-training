// require('reflect-metadata');
import "reflect-metadata";
require('zone.js');

import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField
} from '@microsoft/sp-client-preview';

import styles from './HelloWorld.module.scss';
import * as strings from 'mystrings';
import { IHelloWorldWebPartProps } from './IHelloWorldWebPartProps';

import {Component, Directive, ViewContainerRef, ComponentResolver} from 'angular2/core';
import {bootstrap}    from 'angular2/platform/browser';

export default class HelloWorldWebPart extends BaseClientSideWebPart<IHelloWorldWebPartProps> {

  public constructor(context: IWebPartContext) {
    super(context);
    bootstrap(
      // The bootstrap function accepts any contructable object as a parameter.

      // First we must decorate the constructable object (which will serve as our Component)
      // with metadata that tells Angular2 which CSS Selector to look for in the HTML, and how to render
      // the Component's view inside the CSS Selector's element.
      Component(
        {
          selector: 'my-app-' + this.context.instanceId,
          template:
            `<p>Dynamic Component {{message}}</p>
            <button (click)="addTodo()">Click</button>
            <ul>
              <li *ngFor="let todo of todos">
                {{ todo }}
              </li>
            </ul>
            `
        }
      )
      // Now we must define a constructable object that will be our Component.
      // We wrap the constructable object in parenthesis to explicitly tell the parser to
      // expect an expression and not a declaration.
      // ***But more importantly, we wrap with parenthesis so that we can the IIFE
      // object model that is transpiled from the class declaration is
      // lexically scoped in this WebPart instance.
      (
        // This class gets transpiled to a JavaScript IIFE containing an object model
        class AppComponent {

        public todos: string[];
        public message: string;

        constructor(private vcRef: ViewContainerRef, private resolver: ComponentResolver) {
          this.todos = ['task1', 'task 2'];
          this.message = "Good morning!";
          console.log('annotations');
          console.log(Reflect.getMetadata('annotations', AppComponent));
          // console.log('design:paramtypes');
          // console.log(Reflect.getMetadata('design:paramtypes', AppComponent));
          // console.log('propMetadata');
          // console.log(Reflect.getMetadata('propMetadata', AppComponent));
          // console.log('parameters');
          // console.log(Reflect.getMetadata('parameters', AppComponent));
        }

        public addTodo(): void {
          console.log('in addTodo');
          this.todos.push('feature 1');
          console.log(this.todos);
        };
        }
      )
    ).then(app => {
        console.log(app['_hostElement'].nativeElement);
        console.log('Bootstrap Successful');
        console.log(app);
      }, err => {
        console.error(err);
      }
    );
  }

 public render(): void {
    this.domElement.innerHTML = `
      <div class="Ng2">
          <h1>Angular 2-${this.context.instanceId}</h2>
          <my-app-${this.context.instanceId}/>
      </div>
      `;

 }
  protected get propertyPaneSettings(): IPropertyPaneSettings {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
