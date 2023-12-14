import { Pizza } from "./pizza";

export interface PizzaService {
    
    addPizza(pizza: Pizza, callback: (error: Error | null, result?: any) => void): void;
    getAllPizzas(callback: (error: Error | null, pizzas?: Pizza[]) => void): void;
    deletePizza(id: number, callback: (error: Error | null, result?: any) => void): void;
    updateById(id: number, updatedData: any, callback: (error: Error | null, result?: any) => void): void;
    addIngredientsToPizza(pizzaId: number, ingredientIds: number[]): Promise<any[]>;
    // decoDB():void;

}