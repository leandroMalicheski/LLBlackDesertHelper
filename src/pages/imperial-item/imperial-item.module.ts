import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImperialItemPage } from './imperial-item';

@NgModule({
  declarations: [
    ImperialItemPage,
  ],
  imports: [
    IonicPageModule.forChild(ImperialItemPage),
  ],
  exports: [
    ImperialItemPage
  ]
})
export class ImperialItemPageModule {}
