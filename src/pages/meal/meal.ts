import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils';
import { Meal } from '../../classes/meal';
import { Ingredient } from '../../classes/ingredients';

interface MealForm {qty:number,timeSpentToFinish:number};
interface CookingUtensil {timeGrant:string,icon:string};
interface Clothes {level:number,isOn:boolean,icon:string};
/**
 * Generated class for the MealPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-meal',
  templateUrl: 'meal.html',
})
export class MealPage {
  meal: Meal;
  mealForm: MealForm;
  ingredientList: Ingredient[]; 
  cookingUtensil: CookingUtensil;
  cookingClothes: Clothes;
  hideIngredientsPage: boolean;
  hideTimePage: boolean;
  totalTimeSpent: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public utilsProvider:UtilsProvider, public toastCtrl: ToastController) {
    this.meal = navParams.get('item');
    this.mealForm = {"qty": 1, "timeSpentToFinish": 10};
    let qty = navParams.get('qtyToCraft');
    
    this.hideIngredientsPage = false;
    this.hideTimePage = true;

    this.cookingUtensil = {"timeGrant":"+0","icon":"assets/imgs/utensils/cookingUtensil.png"};
    this.cookingClothes = {"level":0,"isOn":false,"icon":"assets/imgs/clothes/cookingClothes.png"};
    
    this.ingredientList = this.getIngredientsList(this.meal.ingredients);

    if(qty){
      this.mealForm.qty = qty;
      this.mealForm.timeSpentToFinish = qty * 10; 
      this.calculate();
    }
  }

  calculate() {
    let toast = this.toastCtrl.create({
      message: 'Valor calculado com Sucesso!!',
      cssClass: 'toastSuccess',
      duration: 3000,
      position: 'top'
    });
    
    this.ingredientList.forEach(element => {
      element.qtyTotal = this.mealForm.qty * element.qty;
    });
    
    this.calculateTimeSpent(this.timeGrantByUtensil(),this.timeGrantByClothes(),this.mealForm.timeSpentToFinish * this.mealForm.qty);    

    toast.present();
  }

  calculateTimeSpent(timeGrantByUtensil,timeGrantByClothes,timeSpentCooking){
    let totalTimeSpent = timeSpentCooking;
    let signal = this.cookingUtensil.timeGrant.substring(0,1);
    if(signal === "+"){
      totalTimeSpent = totalTimeSpent + timeGrantByUtensil;  
    }else{
      totalTimeSpent = totalTimeSpent - timeGrantByUtensil;  
    }
    totalTimeSpent = totalTimeSpent - timeGrantByClothes;
    
    let totalTimeSpentInMinutes = this.utilsProvider.convertSecToMin(totalTimeSpent);
    if(totalTimeSpentInMinutes < 1){
      this.totalTimeSpent = totalTimeSpent + " Segundos.";
    }else if(totalTimeSpentInMinutes > 60){
      this.totalTimeSpent = this.utilsProvider.transformHoursInHHMMSS(totalTimeSpent);
    }else{
      this.totalTimeSpent = this.utilsProvider.transformMinutesInMMSS(totalTimeSpentInMinutes);
    }
  }

  showMeal(){
    this.hideIngredientsPage = false;
    this.hideTimePage = true;
  }

  showTime(){
    this.hideIngredientsPage = true;
    this.hideTimePage = false;
  }

  getIngredientsList(list){
    let ingredients = JSON.parse(sessionStorage.getItem('ingredients'));
    let ingredientList = [];
    list.forEach(element => {
      let ingredient = ingredients[element.id];
          ingredient.qty = ingredient.qtyTotal = element.qty;
      ingredientList.push(ingredient);
    });
    return ingredientList;
  }

  timeGrantByUtensil(){
    let timeGrantByUtensil = Number(this.cookingUtensil.timeGrant.substring(1));
    return timeGrantByUtensil * this.mealForm.qty;
  }

  timeGrantByClothes(){
    let timeGrantByClothes = 0;
    if(this.cookingClothes.isOn){
      if(this.cookingClothes.level === 5){
        timeGrantByClothes = 7 * this.mealForm.qty;
      }else{
        timeGrantByClothes = (this.cookingClothes.level + 1) * this.mealForm.qty;
      }
    }
    return timeGrantByClothes;
  }

  ingredientTapped(item: Ingredient){
    if(item.hasIngredientPage){
      this.navCtrl.push('IngredientPage',{'item':item})
    }
    
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MealPage');
  }

}
