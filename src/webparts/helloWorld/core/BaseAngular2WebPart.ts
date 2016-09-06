// require('reflect-metadata');
/* tslint:disable */

import "reflect-metadata";
require('zone.js');
import TodoAngular2Component from '../TodoAngular2Component';
import {
  BaseClientSideWebPart,
  IWebPartContext,
} from '@microsoft/sp-client-preview';

import {Component, ComponentResolver, NgZone, ViewContainerRef} from 'angular2/core';
import {bootstrap}    from 'angular2/platform/browser';

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
   console.log('Rendering: ' + (new Date()).valueOf());
   /*if (this.renderedOnce) {
      return;
    }*/

    this.domElement.innerHTML = `<ng2-webpart-${this.context.instanceId} />`;

    this._bootStrapComponent();
 }

 private _bootStrapComponent(): void {
    console.log('Starting bootstrap: ' + (new Date()).valueOf());
    bootstrap(
      // The bootstrap function accepts any contructable object as a parameter.
      TodoAngular2Component.getAngular2Component(this.context.instanceId)
    ).then(app => {
       console.log('Bootstrapping complete: ' + (new Date()).valueOf());
        //console.log(app);
        this._component = app['_hostElement']['component'];
        this._app = app;
        this.updateChanges();
      this._app.changeDetectorRef.detectChanges();
      }, err => {
        console.error(err);
      }
    );
 }

 protected updateChanges(): void {
   throw new Error('Need to to override this method');
 }
}
