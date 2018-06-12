export class Timer {
    nextReset: string;
    constructor (name: string){
        if(name == "ImperialReset"){
            this.getNextImperialReset();
        }        
    }

    getNextReset(time: number, isSavingTime: boolean, limite:number){
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

    getNextImperialReset(){
        let date = new Date();
        let isSavingTime = date.getTimezoneOffset();
        let horario = date.getHours();

        this.nextReset = (isSavingTime == 180) ? this.getNextReset(horario,false,21):this.getNextReset(horario,true,22);
    }
}