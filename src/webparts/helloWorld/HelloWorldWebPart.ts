// require('reflect-metadata');
import BaseAngular2WebPart from './BaseAngular2WebPart';

import {
  IPropertyPaneSettings,
  PropertyPaneTextField,
  IHtmlProperties
} from '@microsoft/sp-client-preview';

// import styles from './HelloWorld.module.scss';
import * as strings from 'mystrings';
import { IHelloWorldWebPartProps } from './IHelloWorldWebPartProps';

export default class HelloWorldWebPart extends BaseAngular2WebPart<IHelloWorldWebPartProps> {

  public onBeforeSerialize(): IHtmlProperties {
    this.properties.todos = this.component.todos;
    return null;
  }

  public onPropertyChange(propertyPath: string, newValue: any): void {
    // Update value
    if (propertyPath === "description") {
      console.log('prop change');
      this.component.description = newValue;
    }

    super.onPropertyChange(propertyPath, newValue);
  }

 protected updateChanges(): void {
      this.component.description = this.properties.description;
      console.log(this.properties);
      this.component.todos = this.properties.todos;
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
