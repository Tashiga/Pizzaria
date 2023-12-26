import type { Ingredient } from '@/model/pizza';
import axios, { type AxiosResponse } from 'axios';

const API : string = 'http://localhost:3000/api/ingredients/';

const IngredientService = {
    
    async getIngredients() {
        return axios.get(API + 'all-ingredients');
    },

    async addIngredient(newIngredient: Ingredient): Promise<AxiosResponse<Ingredient>> {
        return axios.post<Ingredient>(API + 'add-ingredient', newIngredient);
    },

    async deleteIngredientbyId(ingredientId: number): Promise<AxiosResponse<void>>{
        return axios.delete<void>(API + `delete/${ingredientId}`);
    },

    async updateIngredient(ingredientId: number, updatedIngredient: Ingredient): Promise<AxiosResponse<Ingredient>> {
        return axios.put<Ingredient>(API + `update-ingredient/${ingredientId}`, updatedIngredient);
    }
  };
  
  export default IngredientService;