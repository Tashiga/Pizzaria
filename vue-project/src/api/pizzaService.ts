import type { Pizza } from '@/model/pizza';
import axios, { type AxiosResponse } from 'axios';

const API : string = 'http://localhost:3000/api/pizzas/';

const PizzaService = {
    async getPizzas() {
        return axios.get(API + 'all-pizzas');
    },

    async addPizza(newPizza: Pizza): Promise<AxiosResponse<Pizza>> {
        return axios.post<Pizza>(API + 'add-pizza', newPizza);
    },

    async addIngredientsToPizza(pizzaId: number, ingredientIds: number[]): Promise<AxiosResponse<Pizza>> {
        return axios.post<Pizza>(API + `add-ingredients-pizza/${pizzaId}`, ingredientIds);
    },

    async deletePizzabyId(pizzaId: number): Promise<AxiosResponse<void>>{
        return axios.delete<void>(API + `delete/${pizzaId}`);
    },

    async updatePizza(pizzaId: number, updatedPizza: Pizza): Promise<AxiosResponse<Pizza>> {
        return axios.put<Pizza>(API + `update-pizza/${pizzaId}`, updatedPizza);
    }
  };
  
  export default PizzaService;