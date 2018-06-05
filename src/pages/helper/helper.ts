import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ImperialItem } from '../../classes/imperialItem';
import { Meal } from '../../classes/meal';

import { UtilsProvider } from '../../providers/utils/utils';
import { Ingredient } from '../../classes/ingredients';

/**
 * Generated class for the HelperPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-helper',
  templateUrl: 'helper.html',
})
export class HelperPage {

  imperialItemListAprendiz: ImperialItem[];
  imperialItemListProficiente: ImperialItem[];
  imperialItemListProfissional: ImperialItem[];
  imperialItemListMestre: ImperialItem[];
  imperialItemListArtesao: ImperialItem[];

  mealListIniciante: Meal[];
  mealListAprendiz: Meal[];
  mealListProficiente: Meal[];
  mealListProfissional: Meal[];
  mealListArtesao: Meal[];
  mealListMestre: Meal[];

  ingredientList: Ingredient[];  

  nextImperialReset: string;
  currentDate: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public utilsProvider: UtilsProvider) {
    let list = JSON.parse(sessionStorage.getItem('imperialCookingList'))
    this.imperialItemListAprendiz = utilsProvider.getAprendiz(list);
  	this.imperialItemListProficiente = utilsProvider.getProficiente(list);
  	this.imperialItemListProfissional = utilsProvider.getProfissional(list);
    this.imperialItemListMestre = utilsProvider.getMestre(list);
    this.imperialItemListArtesao = utilsProvider.getArtesao(list);

    let mealList = this.filterMealList(JSON.parse(sessionStorage.getItem('mealList')));
    this.mealListIniciante = utilsProvider.getIniciante(mealList);
    this.mealListAprendiz = utilsProvider.getAprendiz(mealList);
  	this.mealListProficiente = utilsProvider.getProficiente(mealList);
  	this.mealListProfissional = utilsProvider.getProfissional(mealList);
    this.mealListMestre = utilsProvider.getMestre(mealList);
    this.mealListArtesao = utilsProvider.getArtesao(mealList);

    this.ingredientList = this.filterIngredientsList(JSON.parse(sessionStorage.getItem('ingredients')));
  }

  mealTapped(item){
    this.navCtrl.push('MealPage', {'item':item});
  }

  ingredientTapped(item){
    this.navCtrl.push('IngredientPage', {'item':item});
  }
  
  imperialItemTapped(item){
    this.navCtrl.push('ImperialItemPage', {'item':item});
  }

  filterIngredientsList(list){
    let filteredList = [];
    list.forEach(element => {
      if(element.hasIngredientPage){
        filteredList.push(element);
      }
    });
    return filteredList;
  }

  filterMealList(list){
    let filteredList = [];
    let idList: Array<string>;
    idList = ["0","3","4","5","7","9","11","14","16","18","20","22","27","29","31","32","37"];
    list.forEach(element => {
      if(idList.includes(element.id)){
        filteredList.push(element);
      }
    });
    return filteredList;
  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad HelperPage');
  }

  ionViewDidEnter(){
    let currentDate = new Date();
    let isSavingTime = currentDate.getTimezoneOffset();
    let horario = currentDate.getHours();
    this.currentDate = currentDate.getHours()+":"+currentDate.getMinutes();
                                                                            //Horario de Inverno   //Horario de Verão
    this.nextImperialReset = (isSavingTime == 180) ? this.getNextImperialReset(horario,false,21):this.getNextImperialReset(horario,true,22);
  }

  getNextImperialReset(time:number,isSavingTime: boolean,limite:number){
    let nextImperialReset = "01:00";
    let count = isSavingTime ? 1 : 0;
    while(count != limite){
      if(time >= count && time < count+3){
        nextImperialReset = count+3+":00";
        break;
      }
      count = count +3;
    }
    return nextImperialReset;
  }

}
