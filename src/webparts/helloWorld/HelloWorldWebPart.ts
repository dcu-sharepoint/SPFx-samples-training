// require('reflect-metadata');
import "reflect-metadata";
require('zone.js');

import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField,
  IHtmlProperties
} from '@microsoft/sp-client-preview';

import styles from './HelloWorld.module.scss';
import * as strings from 'mystrings';
import { IHelloWorldWebPartProps } from './IHelloWorldWebPartProps';

import {Component, ComponentResolver, NgZone, ViewContainerRef} from 'angular2/core';
import {bootstrap}    from 'angular2/platform/browser';

export default class HelloWorldWebPart extends BaseClientSideWebPart<IHelloWorldWebPartProps> {
  private _app: any;
  private _component: any;
  private _bindingSet: boolean;


  public onBeforeSerialize(): IHtmlProperties {
    if ( !this._bindingSet ) {
      // Define all Controller scope variables here
      this._component.description = this.properties.description;
      this._bindingSet = true;
    }
    this.properties.description = this._component.description;
    this._app.changeDetectorRef.detectChanges();
    return null;
  }

  public onPropertyChange(propertyPath: string, newValue: any): void {
    // Update value
    if (propertyPath === "description") {
      console.log('prop change');
      this._component.description = newValue;
    }
  }

  public constructor(context: IWebPartContext) {
    super(context);
    bootstrap(
      // The bootstrap function accepts any contructable object as a parameter.

      // First we must decorate the constructable object (which will serve as our Component)
      // with metadata that tells Angular2 which CSS Selector to look for in the HTML and then bootstraps that element,
      // and how to render the Component's view inside the CSS Selector's element.
      Component(
        {
          selector: 'my-app-' + this.context.instanceId,
          template:
            `<p>{{description}}</p>
            <button (click)="addTodo()">Click</button>
            <ul>
              <li *ngFor="let todo of todos">
                {{ todo }}
              </li>
            </ul>
            `
        }
      )
      // Now we must define the constructable object that will be our Component.
      // We wrap the constructable object in parenthesis to explicitly tell the parser to
      // expect an expression and not a declaration.
      // ***But more importantly, we wrap with parenthesis so that the IIFE
      // object model that is transpiled from the class declaration is
      // lexically scoped in this WebPart instance.
      (
        // This class gets transpiled to a JavaScript IIFE containing an object model
        class AppComponent {

        public todos: string[];
        public description: string;

        constructor(private vcRef: ViewContainerRef, private resolver: ComponentResolver, private zone: NgZone) {
          this.todos = ['task1', 'task 2'];
          this.zone;
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
          this.todos.push('feature 1');
        };

        }
      )
    ).then(app => {
        console.log('Bootstrap Successful');
        //console.log(app);
        this._component = app['_hostElement']['component'];
        this._app = app;
      }, err => {
        console.error(err);
      }
    );
  }

 public render(): void {
   if (this.renderedOnce) {
      return;
    }

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
