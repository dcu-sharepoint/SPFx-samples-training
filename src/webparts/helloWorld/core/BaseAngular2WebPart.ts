// require('reflect-metadata');
/* tslint:disable */

import "reflect-metadata";
require('zone.js');
import TodoComponent from '../TodoComponent';
import ListComponent from '../ListComponent';
import {
  BaseClientSideWebPart,
  IWebPartContext,
} from '@microsoft/sp-client-preview';

import {Component, ComponentResolver, NgZone, ViewContainerRef} from 'angular2/core';
import {NgModule, ApplicationRef} from '@angular/core';
// import {CommonModule} from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { bootstrap }    from 'angular2/platform/browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from '../AppModule';
// import {platformBrowserDynamic} from '@angular/browser-platform-dynamic';


export default class BaseAngular2WebPart<TProperties> extends BaseClientSideWebPart<TProperties> {
  private _app: any;
  private _component: any;

  protected get angular2Component(): any {
    return this._component;
  }

  public onPropertyChange(propertyPath: string, newValue: any): void {
    // Update value
    //this._app.changeDetectorRef.detectChanges();
    this._app.tick();
  }

 public render(): void {
    // @todo: most likely we need to make this width:100%
    this.domElement.innerHTML = `<ng2-webpart-${this.context.instanceId} />`;
    this._bootStrapComponent();
 }

 private _bootStrapComponent(): void {
    platformBrowserDynamic().bootstrapModule(this._getModule()).then(
      ngModuleRef => {
        console.log(ngModuleRef);
        this._app =  ngModuleRef['_ApplicationRef__9'];
        this._component = this._app['_rootComponents'][0]['_hostElement']['component'];
        this.updateChanges();
        this._app.tick();
      }, err => {
        console.log(err);
      }
    );
 }

 private _getModule(): any {
   let component = TodoComponent.getComponent(this.context.instanceId);

  return NgModule({
    imports: [ BrowserModule ],
    declarations: [ component, ListComponent ],
    bootstrap:    [ component ]
  })(
    class AppModule {}
  );
}

 protected updateChanges(): void {
   throw new Error('Need to to override this method');
 }
}
