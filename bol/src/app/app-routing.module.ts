import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImageClassifierComponent } from './image-classifier/image-classifier.component';
import { OverlayComponent } from './overlay/overlay.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/image-classifier',
    pathMatch: 'full'
  },
  {path: "overlay", component: OverlayComponent},
  {path: "image-classifier", component: ImageClassifierComponent},
  
];

@NgModule({
  declarations: [/*...*/],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
