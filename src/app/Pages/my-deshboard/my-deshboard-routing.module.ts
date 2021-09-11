import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyDeshboardPage } from './my-deshboard.page';

const routes: Routes = [
  {
    path: '',
    component: MyDeshboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyDeshboardPageRoutingModule {}
