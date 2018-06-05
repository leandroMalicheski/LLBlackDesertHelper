import {UtilsProvider} from '../providers/utils/utils';
export class ImperialItem {
    maskedPrice: string;
    constructor(
        public id: string, 
        public name: string, 
        public icon: string,
        public level: string, 
        public local: string, 
        public cratfItemId: string, 
        public qtyToCraft: number,  
        public price: number,
    ){
        this.maskedPrice = UtilsProvider.getPriceMasked(price);
    }
}