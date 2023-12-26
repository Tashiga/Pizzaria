import { Ingredient } from "./ingredient";

export interface IngredientService {
    addIngredient(ingredient: Ingredient, callback: (error: Error | null, result?: any) => void): void;
    getAllIngredients(callback: (error: Error | null, ingredients?: Ingredient[]) => void): void;
    deleteIngredient(id: number, callback: (error: Error | null, result?: any) => void): void;
    updateById(id: number, updatedData: any, callback: (error: Error | null, result?: any) => void): void;
    // decoDB():void;
}