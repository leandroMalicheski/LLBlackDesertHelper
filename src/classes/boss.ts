import { BossProvider } from "../providers/boss/boss";

export class Boss {
    nextSpawn: string;
    bossProvider: BossProvider;
    
    constructor(
        public name: string,
        public location: string,
        public img: string,
    ){
        this.bossProvider = new BossProvider();
        this.nextSpawn = this.bossProvider.getNextSpawnByName(name);
    }
};