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
// import {NgModule, ApplicationRef} from '@angular/core';
// import {CommonModule} from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';
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
    this._app.changeDetectorRef.detectChanges();
  }

 public render(): void {
    // @todo: most likely we need to make this width:100%
    this.domElement.innerHTML = `<ng2-webpart />`;
    this._bootStrapComponent();
    // NgModule({
    //   declarations: [TodoComponent, ListComponent],
    //   entryComponents: [TodoComponent]
    // })
    // class AppModule {
    //   constructor(appRef: ApplicationRef) {
    //     appRef.bootstrap(TodoComponent);
    //   }
    // }
 }

 private _bootStrapComponent(): void {
    // bootstrap(
    //   // The bootstrap function accepts any contructable object as a parameter.
    //   TodoComponent.getAngular2Component(this.context.instanceId)
    // ).then(app => {
    //    console.log('Bootstrapping complete: ' + (new Date()).valueOf());
    //     this._component = app['_hostElement']['component'];
    //     this._app = app;
    //     this.updateChanges();
    //   this._app.changeDetectorRef.detectChanges();
    //   }, err => {
    //     console.error(err);
    //   }
    // );
    console.log("bootstraping module");
    platformBrowserDynamic().bootstrapModule(AppModule).then(
      ngModuleRef => {
        console.log(ngModuleRef);
        this._component = ngModuleRef['_ApplicationRef__9']['_rootComponents'][0]['_hostElement']['component'];
      }, err => {
        console.log(err);
      }
    );
 }

 protected updateChanges(): void {
   throw new Error('Need to to override this method');
 }
}
