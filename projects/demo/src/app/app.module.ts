import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AButtonsModule } from 'projects/library/src/public-api';
import { ACustomEventsModule } from '@acaprojects/ngx-custom-events';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AButtonsModule,
    BrowserModule,
    FormsModule,
    ACustomEventsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
