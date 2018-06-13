import { TimerProvider } from "../providers/timer/timer";

export class Timer {
    nextReset: string;
    timerProvider: TimerProvider;

    constructor (
        public name: string, 
        public img: string
    ){
        this.timerProvider = new TimerProvider();
        if(name = "ImperialReset"){
            this.nextReset = this.timerProvider.getNextImperialReset();
        }
    }    
}