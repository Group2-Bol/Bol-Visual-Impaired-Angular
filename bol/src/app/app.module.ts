import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImgEnhancementComponent } from './img-enhancement/img-enhancement.component';
import { ImageClassifierComponent } from './image-classifier/image-classifier.component';
import { JstestComponent } from './jstest/jstest.component';
import { OverlayComponent } from './overlay/overlay.component';

@NgModule({
  declarations: [
    AppComponent,
    ImgEnhancementComponent,
    ImageClassifierComponent,
    JstestComponent,
    OverlayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
