interface PlusCrafted {name: string};
interface PlusCraftedList extends Array<PlusCrafted>{};
interface RecipeItem {id:string, qty: number};
interface RecipeItemList extends Array<RecipeItem>{};

export class Meal {
    qtyTotal: number;
	qty: number;
	
	constructor(
        public id: string, 
        public name: string, 
        public level: string, 
        public icon: string, 
        public plusCrafted: PlusCraftedList, 
        public ingredients: RecipeItemList
    ){}
}