import { Injectable } from '@angular/core';
import { Boss } from '../../classes/boss';

/*
  Generated class for the BossProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BossProvider {

  constructor() {}


  getNextSpawn(boss : Boss){
    let currentDate = new Date();
    if(boss.name == "Kzarka"){
      boss.nextSpawn = this.getNextKzarkRespawn(currentDate.getDay(), currentDate.getHours(), currentDate.getMinutes());
    }else if(boss.name == "Nouver"){ 
      boss.nextSpawn = this.getNextNouverRespawn(currentDate.getDay(), currentDate.getHours(), currentDate.getMinutes());
    }else if(boss.name == "Kutum"){
      boss.nextSpawn = this.getNextKutumRespawn(currentDate.getDay(), currentDate.getHours(), currentDate.getMinutes());
    }else if(boss.name == "Karanda"){
      boss.nextSpawn = this.getNextKarandaRespawn(currentDate.getDay(), currentDate.getHours(), currentDate.getMinutes());
    }else{
      boss.nextSpawn = "N/A"
    }
  }

  private getNextKzarkRespawn(diaSemana: number, hora:number, minuto:number)  {
      let retorno: string;
      switch(diaSemana){
        // Domigo - 0, Sabado - 6
        case 0: case 1:
          if (hora >= 0 && hora < 16){retorno = "Hoje - 16:00";}
          else if(hora >= 26 && (hora < 23 && minuto < 30)){retorno = "Hoje - 23:30";}
          else if(diaSemana == 0 && (hora >= 23 && minuto >= 30)){retorno = "Seg - 16:00";}
          else{retorno = "Ter - 11:00";}
          break;
        case 2:
          if (hora >= 0 && hora < 11){retorno = "Hoje - 11:00";}
          else if(hora >= 11 && hora < 20 ){retorno = "Hoje - 20:00";}
          else{retorno = "Qua - 02:00";}
          break;
        case 3:
          if(hora >= 0 && hora < 2){retorno = "Hoje = 02:00"}
          else if(hora >= 2 && hora < 16){retorno = "Hoje - 16:00"}
          else{retorno = "Qui - 16:00"}
          break;
        case 4:
          if(hora >= 0 && hora < 16){retorno = "Hoje 16:00"} 
          else if(hora >= 16 && hora < 20){retorno = "Hoje 20:00"} 
          else if(hora >= 20 && (hora < 23 && minuto < 30)){retorno = "Hoje 23:30"} 
          else{retorno = "Sex - 16:00"}
          break;
        case 5:
          if(hora >= 0 && hora < 16){retorno = "Hoje 16:00"} 
          else{retorno = "Sab - 02:00"}
          break;
        case 6:
          if(hora >= 0 && hora < 2){retorno = "Hoje 02:00"} 
          else if(hora >= 2 && hora < 11){retorno = "Hoje 11:00"} 
          else{retorno = "Dom - 16:00"}
          break;
      }
      return retorno;
    }
  
    private getNextNouverRespawn(diaSemana: number, hora:number, minuto:number)  {
      let retorno: string;
      switch(diaSemana){
        // Domigo - 0, Sabado - 6
        case 0:
          if(hora >= 0 && hora < 2){retorno =  "Hoje - 02:00";}
          else if(hora >= 2 && hora <= 20){retorno =  "Hoje - 20:00"}
          else{retorno =  "Seg - 11:00"}
          break;
        case 1: case 4: case 5:
          if(hora >= 0 && hora < 11){retorno = "Hoje - 11:00"} 
          else if(hora >= 11 && hora <20){retorno = "Hoje - 20:00"}
          else if(diaSemana == 1 && hora >= 20){retorno = "Ter - 16:00"}
          else if(diaSemana == 4 && hora >= 20){retorno = "Sex - 11:00"}
          else{retorno = "Sab - 16:00"}
          break;
        case 2: case 6:
          if(hora >= 0 && hora < 16){retorno =  "Hoje - 16:00";}
          else if(hora >= 16 && (hora < 23 && minuto < 30)){retorno =  "Hoje - 23:30"}
          else if(diaSemana == 2 && (hora >= 23 && minuto >= 30)){retorno =  "Qua - 16:00"}
          else{retorno =  "Dom - 02:00"}
          break;
        case 3:
          if(hora >= 0  && hora < 16){retorno = "Hoje - 16:00"}
          else if(hora >=16 && hora < 20){retorno = "Hoje - 20:00"}
          else{retorno = "Qui - 11:00"}
          break;
      }
      return retorno;
    }
  
    private getNextKutumRespawn(diaSemana: number, hora:number, minuto:number)  {
      let retorno: string;
      switch(diaSemana){
        // Domigo - 0, Sabado - 6
        case 0: case 6:
          if(hora >= 0 && hora < 11){retorno = "Hoje - 11:00"}
          else if(hora >= 11 && (hora < 23 && minuto < 30)){retorno = "Hoje - 23:30"} 
          else if(diaSemana == 0 && (hora >= 23 && minuto >= 30)){retorno = "Seg - 16:00"}
          else{retorno = "Dom - 11:00"}          
          break;
        case 1:
          if(hora >= 0 && hora < 16){retorno = "Hoje - 16:00"}
          else if (hora >= 16 && hora < 20){retorno = "Hoje - 20:00"}
          else{retorno = "Ter - 02:00"}
          break;
        case 2:
          if(hora >= 0 && hora < 2){retorno = "Hoje - 02:00"}
          else if (hora >= 2 && hora < 16){retorno = "Hoje - 16:00"}
          else{retorno = "Qua - 11:00"}
          break;
        case 3:
          if(hora >= 0 && hora < 11){retorno = "Hoje - 11:00"}
          else if (hora >= 2 && hora < 20){retorno = "Hoje - 20:00"}
          else{retorno = "Qui - 16:00"}
          break;
        case 4:
          if(hora >=0 && hora <16){retorno = "Hoje - 16:00";}
          else{retorno = "Sex - 16:00";}
          break;
        case 5:
          if((hora < 16 || (hora > 23 && minuto > 30))){retorno = "16:00";}
          else if(hora >= 16 && hora < 20){retorno = "20:00"}
          else{retorno = "23:30";} 
          break;
      }
      return retorno;
    }
  
    private getNextKarandaRespawn(diaSemana: number, hora:number, minuto:number)  {
      let retorno: string;
      switch(diaSemana){
        // Domigo - 0, Sabado - 6
        case 0: 
          if(hora >= 0 && hora < 16){retorno = "Hoje - 16:00"}
          else if(hora >= 16 && hora < 18){retorno = "Hoje - 20:00"}
          else {retorno = "Seg - 02:00"}  
          break;
        case 1: case 5:
          if(hora >= 0 && hora < 2){retorno = "Hoje - 02:00"}
          else if(diaSemana == 1 && hora >= 2){retorno = "Ter - 20:00"}
          else{retorno = "Sab - 23:30"}  
          break;
        case 2:
          if(hora > 0 && hora < 20){retorno = "Hoje - 20:00";}
          else{retorno = "Qua - 23:30"}
          break;
        case 3: case 6:
          if(hora > 0 && (hora < 23 && minuto < 30)){retorno = "Hoje - 23:30";}
          else{retorno = "Qui - 02:00"}  
          break;
        case 4:
          if(hora >= 0 && hora < 2){retorno = "Hoje - 02:00"}
          else if(hora >= 2 && (hora < 23 && minuto < 30)){retorno = "Hoje - 23:30"}
          else {retorno = "Sex - 02:00"}  
          break;
      }
      return retorno;
    }
}
