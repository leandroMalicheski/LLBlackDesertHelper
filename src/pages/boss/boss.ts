import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
import { Boss } from '../../classes/boss';
import { UtilsProvider } from '../../providers/utils/utils';

/**
 * Generated class for the BossPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-boss',
  templateUrl: 'boss.html',
})
export class BossPage {

  boss : Boss;

  localCalendar: Calendar;
  constructor(public navCtrl: NavController, public navParams: NavParams, public calendar: Calendar, public utilsProvider: UtilsProvider) {
    this.boss = navParams.get('item');
  }

  addEvent(){
    this.calendar.hasReadWritePermission().then(
      (retorno) => {
        if(retorno){
          let minutes = Number(this.boss.nextSpawn.substr(this.boss.nextSpawn.indexOf(":")+1));
          let hours = Number(this.boss.nextSpawn.substr(this.boss.nextSpawn.indexOf(":")-2,2));
          this.createEvent(minutes,hours,this.boss.nextSpawn.charAt(0) != 'H');
        } else{ 
          this.requestReadWritePermission()
        }
      }
    )
  }

  createEvent(minutes: number, hours: number, isNextDay: boolean){
    
    let startDate = new Date();
    let endDate = new Date();
        
    startDate.setHours(Number(hours));
    startDate.setMinutes(Number(minutes));
    
    endDate.setHours(Number(hours));
    endDate.setMinutes(Number(minutes+15));
    
    if(isNextDay){
      let diaAtual = startDate.getDate()
      startDate.setDate(diaAtual+1);
      endDate.setDate(diaAtual+1);
    }
    
    let calendarOptions = this.calendar.getCalendarOptions();
    calendarOptions.firstReminderMinutes = 30;
    calendarOptions.secondReminderMinutes = 15;
    
    this.calendar.createEventWithOptions("Nascimento do " + this.boss.name, this.boss.location, "Curta a Página do LL", startDate, endDate, calendarOptions);
    this.utilsProvider.showToast(UtilsProvider.SUCCESS_TOAST, "Evento Adicionado com Sucesso!!");
  }

  requestReadWritePermission(){
    this.calendar.requestReadWritePermission().then(
      (retorno) => {
        if(retorno){
          let minutes = Number(this.boss.nextSpawn.substr(this.boss.nextSpawn.indexOf(":")+1));
          let hours = Number(this.boss.nextSpawn.substr(this.boss.nextSpawn.indexOf(":")-2,2));
          this.createEvent(minutes,hours,this.boss.nextSpawn.charAt(0) != 'H');
        }else{
          this.utilsProvider.showToast(UtilsProvider.FAIL_TOAST, "Falha ao Adicionar Evento.");
        }
      } 
    )
  }  

  ionViewDidLoad() {
    console.log('ionViewDidLoad BossPage');
  }

}
