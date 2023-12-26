export type Pizza = {
    id: number;
    name: string;
    price:number;
    ingredients?: Ingredient[];
}

export type Ingredient = {
   id : number;    
   name : string;
   pizza ?: Pizza;
}