import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChildRoutingModule } from './child-routing.module';
import { ChildComponent } from './child.component';
import { NgxCanItModule } from '@can-it/ngx';

@NgModule({
  declarations: [
    ChildComponent
  ],
  imports: [
    CommonModule,
    ChildRoutingModule,
    // This module will leave the comparators as empty, it should not inherit AppModule's comparators
    NgxCanItModule.forNewScope(),
    // if you replace the above forNewScope by the following forChild method, this module will inherit the AppModule's comparators
    // NgxCanItModule.forChild()
  ]
})
export class ChildModule { }
