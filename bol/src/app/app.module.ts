import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { ImageClassifierComponent } from './image-classifier/image-classifier.component';
import { JstestComponent } from './jstest/jstest.component';

@NgModule({
  declarations: [
    AppComponent,
    //ImageClassifierComponent,
    JstestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
