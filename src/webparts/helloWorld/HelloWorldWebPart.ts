require('reflect-metadata');

import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField
} from '@microsoft/sp-client-preview';

import styles from './HelloWorld.module.scss';
import * as strings from 'mystrings';
import { IHelloWorldWebPartProps } from './IHelloWorldWebPartProps';

import {Component} from 'angular2/core';
import {bootstrap}    from 'angular2/platform/browser';

@Component({
    selector: 'my-app',
    template: '<h1>Heureka, {{message}} I got this working! <button (click)="addTodo()">Click</button></h1> {{todos.length}} <ul> <li *ngFor="#todo of todos">{{ todo }}</li></ul>'
})
export class AppComponent {
  public todos: string[];
  public message: string;

  constructor() {
    this.todos = ['task1', 'task 2'];
    this.message = "Good morning!";
  }

  public addTodo(): void {
    console.log('in addTodo');
    this.todos.push('feature 1');
    console.log(this.todos);
    this.message = "Good night.";
  };

}

export default class HelloWorldWebPart extends BaseClientSideWebPart<IHelloWorldWebPartProps> {

  public constructor(context: IWebPartContext) {
    super(context);
  }

 public render(): void {
     this.domElement.innerHTML = `
        <div class="Ng2">
           <h1>Angular 2</h2>
           <my-app/>
        </div>
        `;
     bootstrap(AppComponent);
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
