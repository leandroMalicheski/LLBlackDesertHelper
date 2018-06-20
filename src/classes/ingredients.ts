interface RecipeItem {id:string, qty: number};
interface RecipeItemList extends Array<RecipeItem>{};

export class Ingredient {
	qtyTotal: number;
	qty: number;
	constructor(public id: string, public name: string, public icon: string, public foodId: string, public foodList: RecipeItemList){}
}