import { Injectable } from '@angular/core';

/*
  Generated class for the UtilsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtilsProvider {
 static readonly INICIANTE = "Iniciante";
 static readonly APRENDIZ = "Aprendiz";
 static readonly PROFICIENTE = "Proficiente";
 static readonly PROFISSIONAL = "Profissional";
 static readonly ARTESAO = "Artesão";
 static readonly MESTRE = "Mestre";
 static readonly MEAL_IMG_PATH = "assets/imgs/meal/";
 static readonly IMPERIAL_IMG_PATH = "assets/imgs/imperialItem/"
 static readonly INGREDIENT_IMG_PATH = "assets/imgs/ingredient/";
 
 constructor() {
   console.log('Hello UtilsProvider Provider');
 }

 static getPriceMasked(price){
   let value = price.toString();
   if (value.length <= 4){
       value = value + ",00";
   } else if(value.length > 4 && value.length <= 6){
       let valueTemp = value.substr(0,value.length - 3);
       if(valueTemp)
       value = valueTemp + "K";    	
   } else {
       while(value.match("000")){ value = value.replace("000", "K"); }
       if(value.length >= 4){
           let valueTemp = value.substr(0,1);
           value = valueTemp + "," + value.substr(1,1) + "KK";
       }
   }
   return value;
 }

 getIniciante(list){
   return this.separateByLevel(list, UtilsProvider.INICIANTE);
 }
 getAprendiz(list){
   return this.separateByLevel(list, UtilsProvider.APRENDIZ);
 }
 getProficiente(list){
   return this.separateByLevel(list, UtilsProvider.PROFICIENTE);
 }

 getProfissional(list){
   return this.separateByLevel(list, UtilsProvider.PROFISSIONAL);
 }

 getMestre(list){
   return this.separateByLevel(list, UtilsProvider.MESTRE);
 }

 getArtesao(list){
   return this.separateByLevel(list, UtilsProvider.ARTESAO);
 }

 private separateByLevel(list,level){
   let listResult = [];
   list.forEach(element => {
     if(element.level.substr(0,6) === level.substr(0,6)){listResult.push(element);}
   });
 	return listResult;
 }

 convertSecToMin(timeInSeconds){
   return timeInSeconds / 60;
 }  
 convertMinToSec(timeInMinutes){
   return timeInMinutes * 60;
 }
 convertMinToHour(timeInMinutes){
   return timeInMinutes / 60;
 }
 convertHourToMin(timeInHours){
   return timeInHours * 60;
 }
 convertSecToHour(timeInSeconds){
   let timeInMinutes = this.convertSecToMin(timeInSeconds);
   return this.convertMinToHour(timeInMinutes);
 }

 transformHoursInHHMMSS(totalTimeSpent){
   let timeInHours = this.convertSecToHour(totalTimeSpent);
     if(this.isFloat(timeInHours)){
       let rest = timeInHours % 1;
       let minutes = this.convertHourToMin(rest);
       if(this.isFloat(minutes)){
         return Math.floor(timeInHours) + " Hora(s), " + this.transformMinutesInMMSS(minutes);
       }else{
         return Math.floor(timeInHours) + " Hora(s) e " + this.transformMinutesInMMSS(minutes);
       }
     }else{
       return timeInHours + " Horas.";  
     }
 }
 
 transformMinutesInMMSS(totalTimeSpent){
   if(this.isFloat(totalTimeSpent)){
     let rest = totalTimeSpent % 1;
     let seconds = this.convertMinToSec(rest);
     if(Math.floor(seconds) === 0){
       return Math.floor(totalTimeSpent) + " Minutos.";
     }else{
       return Math.floor(totalTimeSpent) + " Minutos e " + Math.floor(seconds) + " Segundos." ;  
     }      
   }else{
     return totalTimeSpent + " Minutos.";
   }
 }
 
 private isFloat(number){
   return number % 1 !== 0;
 }
}
