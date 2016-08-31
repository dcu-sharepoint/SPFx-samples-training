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

import {Component, Directive, ViewContainerRef, ComponentResolver, ComponentMetadata, ComponentFactory} from 'angular2/core';
import {bootstrap}    from 'angular2/platform/browser';

export class AppComponent {
  public todos: string[];
  public message: string;

  constructor(private vcRef: ViewContainerRef, private resolver: ComponentResolver) {
    this.todos = ['task1', 'task 2'];
    this.message = "Good morning!";
    console.log('annotations');
    console.log(Reflect.getMetadata('annotations', AppComponent));
    console.log('design:paramtypes');
    console.log(Reflect.getMetadata('design:paramtypes', AppComponent));
    console.log('propMetadata');
    console.log(Reflect.getMetadata('propMetadata', AppComponent));
    console.log('parameters');
    console.log(Reflect.getMetadata('parameters', AppComponent));
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
     bootstrap( Component({
      selector: 'my-app-' + this.context.instanceId,
      template: `<p>Dynamic Component {{message}}</p>`
     })(AppComponent));

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
