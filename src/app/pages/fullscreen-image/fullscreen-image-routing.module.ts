import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullscreenImagePage } from './fullscreen-image.page';

const routes: Routes = [
  {
    path: '',
    component: FullscreenImagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FullscreenImagePageRoutingModule {}
