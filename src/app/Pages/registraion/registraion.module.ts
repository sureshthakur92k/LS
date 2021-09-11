import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistraionPageRoutingModule } from './registraion-routing.module';

import { RegistraionPage } from './registraion.page';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistraionPageRoutingModule,
    MatCardModule
  ],
  declarations: [RegistraionPage]
})
export class RegistraionPageModule {}
