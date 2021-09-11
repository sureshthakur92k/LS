import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistraionPage } from './registraion.page';

const routes: Routes = [
  {
    path: '',
    component: RegistraionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistraionPageRoutingModule {}
