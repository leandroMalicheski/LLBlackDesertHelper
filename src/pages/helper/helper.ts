import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ImperialItem } from '../../classes/imperialItem';
import { Meal } from '../../classes/meal';

import { UtilsProvider } from '../../providers/utils/utils';
import { Ingredient } from '../../classes/ingredients';
import { Boss } from '../../classes/boss';
import { Timer } from '../../classes/timer';
import { BossProvider } from '../../providers/boss/boss';

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
  lifeSkillEffectList: Meal[];

  ingredientList: Ingredient[];  

  bosses: Boss[];
  imperialTimer: Timer;
  currentDate: string;
  alimentos: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public utilsProvider: UtilsProvider, public bossProvider: BossProvider) {
    let list = JSON.parse(localStorage.getItem('imperialCookingList'))
    this.prepareImperialItemLists(list,utilsProvider);
    let mealList = JSON.parse(localStorage.getItem('mealList'));
    this.prepareMealLists(mealList,utilsProvider);    
    this.ingredientList = this.filterIngredientsList(JSON.parse(localStorage.getItem('ingredients')));
    this.bosses = JSON.parse(localStorage.getItem('bosses'));
    this.lifeSkillEffectList = this.filterLifeSkillMealList(mealList);
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

  bossTapped(item: Boss){
    this.navCtrl.push('BossPage', {'item':item});
  }

  timerTapped(item: Timer){
    this.navCtrl.push('TimerPage',{'item':item});
  }

  filterIngredientsList(list){
    let filteredList = [];
    list.forEach(element => {
      if(element.foodList){
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

  filterLifeSkillMealList(list){
    let filteredList = [];
    let lifeSkillsMealList = ["8","23","25","27","28","29","31","32","33","34","37","40","41","42","43","44","45","48","49","50","51"];
    list.forEach(element => {
      if(lifeSkillsMealList.includes(element.id)){
        filteredList.push(element);
      }
    });
    return filteredList;
  }

  prepareImperialItemLists(list: ImperialItem[], utilsProvider: UtilsProvider){
    this.imperialItemListAprendiz = utilsProvider.getAprendiz(list);
  	this.imperialItemListProficiente = utilsProvider.getProficiente(list);
  	this.imperialItemListProfissional = utilsProvider.getProfissional(list);
    this.imperialItemListMestre = utilsProvider.getMestre(list);
    this.imperialItemListArtesao = utilsProvider.getArtesao(list);
  }

  prepareMealLists(list: Meal[], utilsProvider: UtilsProvider){
    this.mealListIniciante = utilsProvider.getIniciante(list);
    this.mealListAprendiz = utilsProvider.getAprendiz(list);
  	this.mealListProficiente = utilsProvider.getProficiente(list);
  	this.mealListProfissional = utilsProvider.getProfissional(list);
    this.mealListMestre = utilsProvider.getMestre(list);
    this.mealListArtesao = utilsProvider.getArtesao(list);
  }

  calculateTimers(){
    this.closeSubSegments();
    this.imperialTimer = new Timer("ImperialReset", "assets/imgs/npc/imperial.png");
    
    let currentDate = new Date();
    this.currentDate = this.addZeroToLeft(currentDate.getHours().toString())+":"+ this.addZeroToLeft(currentDate.getMinutes().toString());
    this.bosses.forEach(element => {
      this.bossProvider.getNextSpawn(element);
    });
  }

  closeSubSegments(){
    this.alimentos = "";
  }

  ionViewDidLoad() {}

  ionViewDidEnter(){
    this.calculateTimers();
  }

  addZeroToLeft(time: string){
    return (time.length == 1) ? "0"+time : time;
   }

}
