import { Injectable } from '@angular/core';

/*
  Generated class for the TimerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TimerProvider {

  constructor() {}

  getNextImperialReset(){
      let date = new Date();
      let isSavingTime = date.getTimezoneOffset();      

      return (isSavingTime == 180) ? this.getNextResetWinterTime(date.getHours(),date.getMinutes(),date.getDay()) : this.getNextResetSavingTime(date.getHours(),date.getMinutes(),date.getDay());
  }

  private getNextResetSavingTime(hour: number, minutes: number, weekDay: number){
    let nextReset = this.getNextReset(hour, true, 22);
    if(nextReset == "01:00" && hour >= 0 && hour <= 23 && minutes <=59){
      nextReset = this.getWeekDay(weekDay, nextReset);
    }else{
      return "Hoje - " + nextReset;
    }
  }  

  private getNextResetWinterTime(hour: number, minutes: number, weekDay: number){
    let nextReset = this.getNextReset(hour, false, 21);
    if(nextReset == "00:00" && hour >= 0 && (hour <= 23 && minutes <=59)){
      return this.getWeekDay(weekDay, nextReset);
    }else{
      return "Hoje - " + nextReset;
    }
  } 
  
  private getWeekDay(weekDay: number, nextReset: string){
    switch (weekDay){
      case 0:
        return "Seg - " +nextReset;
      case 1:
        return "Ter - " +nextReset;
      case 2:
        return "Qua - " +nextReset;
      case 3:
        return "Qui - " +nextReset;
      case 4:
        return "Sex - " +nextReset;
      case 5:
        return "Sab - " +nextReset;
      case 6:
        return "Dom - " +nextReset;
    }
  }

  private getNextReset(time: number, isSavingTime: boolean, limite:number){
    let nextImperialReset = isSavingTime ? "01:00" : "00:00";
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
