import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public utilsProvider: UtilsProvider) {
    this.imperialItem = navParams.get('item');
    this.imperialItemForm = {"result":UtilsProvider.getPriceMasked(this.imperialItem.price), "qty": 1,"qtyToCraft":this.imperialItem.qtyToCraft};
    this.craftMaterial = this.getMealToCraftById(this.imperialItem.cratfItemId);
    this.hideResult = true;
  }

  private getMealToCraftById(id){
    let mealList = JSON.parse(localStorage.getItem('mealList'));
    return mealList[id];
  }

  calculate(){
    this.imperialItemForm.result = UtilsProvider.getPriceMasked(this.imperialItem.price * this.imperialItemForm.qty);
    this.imperialItemForm.qtyToCraft = this.imperialItem.qtyToCraft * this.imperialItemForm.qty;
    this.hideResult = false;
    this.utilsProvider.showToast(UtilsProvider.SUCCESS_TOAST, "Valor calculado com Sucesso!!");
  }

  mealTapped(){
    this.navCtrl.push('MealPage', {'item':this.craftMaterial,'qtyToCraft':this.imperialItemForm.qtyToCraft});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImperialItemPage');
  }

}
