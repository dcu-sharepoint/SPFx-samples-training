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

import {Component, Directive, ViewContainerRef, ViewEncapsulation, ComponentResolver, ComponentMetadata, ComponentFactory} from 'angular2/core';
import {bootstrap}    from 'angular2/platform/browser';

export class AppComponent {
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
    //Reflect.defineMetadata('annotations', metadataValue, C.prototype, "method");

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
      encapsulation: ViewEncapsulation.Emulated,
      template:
        `<p>Dynamic Component {{message}}</p>
        <button (click)="addTodo()">Click</button>
         <ul>
          <li *ngFor="let todo of todos">
            {{ todo }}
          </li>
         </ul>
        `
     })((function () {
	    function AppComponent(vcRef, resolver) {
	        this.vcRef = vcRef;
	        this.resolver = resolver;
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
	        //Reflect.defineMetadata('annotations', metadataValue, C.prototype, "method");
	    }
	    AppComponent.prototype.addTodo = function () {
	        console.log('in addTodo');
	        this.todos.push('feature 1');
	        console.log(this.todos);
	        this.message = "Good night.";
	    };
	    ;
	    return AppComponent;
	}()))).then(app => {
        //app['_hostElement'].nativeElement =  `<div class="Ng2"><h1>Angular 2-${this.context.instanceId}</h2><my-app-${this.context.instanceId}/></div>`
        console.log(app['_hostElement'].nativeElement);
        console.log('Bootstrap Successful');
        console.log(app);
    }, err => {
        console.error(err);
    });

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
