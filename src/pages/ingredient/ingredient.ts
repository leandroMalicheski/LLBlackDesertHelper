import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { Ingredient } from '../../classes/ingredients';
import { Meal } from '../../classes/meal';
import { UtilsProvider } from '../../providers/utils/utils';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public utilsProvider: UtilsProvider) {
    this.ingredient = navParams.get('item');
    this.mealList = this.filterMeal(this.ingredient.foodList)
    this.ingredientForm = {"qty":0};
  }

  filterMeal(list){
    let mealList = JSON.parse(localStorage.getItem('mealList'));
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
    this.mealList.forEach(element => {
      element.qtyTotal = this.ingredientForm.qty / element.qty;
    });
    this.utilsProvider.showToast(UtilsProvider.SUCCESS_TOAST, "Valor calculado com Sucesso!!");
  }

  mealTapped(item){
    this.navCtrl.push('MealPage', {'item':item});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IngredientPage');
  }

}
