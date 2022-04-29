import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverlayComponent } from './overlay/overlay.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/overlay',
    pathMatch: 'full'
  },
  {path: "overlay", component: OverlayComponent},
];

@NgModule({
  declarations: [/*...*/],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
