import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MealPage } from './meal';

@NgModule({
  declarations: [
    MealPage,
  ],
  imports: [
    IonicPageModule.forChild(MealPage),
  ],
  exports: [
    MealPage
  ]
})
export class MealPageModule {}
