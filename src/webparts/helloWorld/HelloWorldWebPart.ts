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
    template: '<h1>Heureka, I got this working!</h1>'
})
export class AppComponent { }

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
