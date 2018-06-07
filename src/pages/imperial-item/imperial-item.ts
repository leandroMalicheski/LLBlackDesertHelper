import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ImperialItem } from '../../classes/imperialItem';
import { UtilsProvider } from '../../providers/utils/utils';

interface ImperialItemForm {result:string,qty:number,qtyToCraft:number};
interface MaterialToCraft {id:string, name:string,icon:string};

/**
 * Generated class for the ImperialItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-imperial-item',
  templateUrl: 'imperial-item.html',
})
export class ImperialItemPage {
  imperialItem: ImperialItem;
  imperialItemForm: ImperialItemForm;
  hideResult: boolean;
  craftMaterial: MaterialToCraft;

  constructor(public navCtrl: NavController, public navParams: NavParams, public utilsProvider: UtilsProvider, public toastCtrl: ToastController) {
    this.imperialItem = navParams.get('item');
    this.imperialItemForm = {"result":UtilsProvider.getPriceMasked(this.imperialItem.price), "qty": 1,"qtyToCraft":this.imperialItem.qtyToCraft};
    this.craftMaterial = this.getMealToCraftById(this.imperialItem.cratfItemId);
    this.hideResult = true;
  }

  private getMealToCraftById(id){
    let mealList = JSON.parse(sessionStorage.getItem('mealList'));
    return mealList[id];
  }

  calculate(){
    let toast = this.toastCtrl.create({
      message: 'Valor calculado com Sucesso!!',
      cssClass: 'toastSuccess',
      duration: 3000,
      position: 'top'
    });
  	this.imperialItemForm.result = UtilsProvider.getPriceMasked(this.imperialItem.price * this.imperialItemForm.qty);
    this.imperialItemForm.qtyToCraft = this.imperialItem.qtyToCraft * this.imperialItemForm.qty;
    this.hideResult = false;
    toast.present(toast);
  }

  mealTapped(){
    this.navCtrl.push('MealPage', {'item':this.craftMaterial,'qtyToCraft':this.imperialItemForm.qtyToCraft});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImperialItemPage');
  }

}
