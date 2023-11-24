import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxCanItModule } from '@can-it/ngx';
import { RelationComparator } from '@can-it/operators-relation';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxCanItModule.forNewScope({
      action: new RelationComparator(
        ['view', 'click'],
        { click: ['view'] } // if a user allow to perform "click", they will able to perform "view" action
      )
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
