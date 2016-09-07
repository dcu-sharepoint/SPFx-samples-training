import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import TodoComponent   from './TodoComponent';
import ListComponent   from './ListComponent';

@NgModule({
  imports: [ BrowserModule ],
  declarations: [ TodoComponent ],
  bootstrap:    [ TodoComponent ]
})
export class AppModule {
}