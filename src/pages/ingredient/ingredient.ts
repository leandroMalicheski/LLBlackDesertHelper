import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Ingredient } from '../../classes/ingredients';
import { Meal } from '../../classes/meal';
interface IngredientForm {qty:0};
/**
 * Generated class for the IngredientPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ingredient',
  templateUrl: 'ingredient.html',
})
export class IngredientPage {
  ingredient: Ingredient;
  ingredientForm: IngredientForm;
  mealList: Meal[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
    this.ingredient = navParams.get('item');
    this.mealList = this.filterMeal(this.ingredient.foodList)
    this.ingredientForm = {"qty":0};
  }

  filterMeal(list){
    let mealList = JSON.parse(sessionStorage.getItem('mealList'));
    let filteredList = [];
    list.forEach(element => {
      let meal = mealList[element.id];
          meal.qty = element.qty;
          meal.qtyTotal = 0;
      filteredList.push(meal);
    });
    return filteredList;
  }

  calculate(){
    let toast = this.toastCtrl.create({
      message: 'Valor calculado com Sucesso!!',
      cssClass: 'toastSuccess',
      duration: 3000,
      position: 'top'
    });
    this.mealList.forEach(element => {
      element.qtyTotal = this.ingredientForm.qty / element.qty;
    });
    toast.present();
  }

  mealTapped(item){
    this.navCtrl.push('MealPage', {'item':item});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IngredientPage');
  }

}
