import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { IonicModule } from '@ionic/angular';

import { MyDeshboardPageRoutingModule } from './my-deshboard-routing.module';

import { MyDeshboardPage } from './my-deshboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyDeshboardPageRoutingModule,
    MatCardModule
  ],
  declarations: [MyDeshboardPage]
})
export class MyDeshboardPageModule {}
