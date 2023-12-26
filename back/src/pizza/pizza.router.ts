import { Request, Response } from 'express';
import { Router } from 'express';
import { PizzaController } from './pizza.controller';

export class PizzaRouter {
    router = Router();

    constructor(private pizzaController: PizzaController) {
        this.configureRoutes();
    }

    private configureRoutes(): void {

        this.router.post('/add-pizza', (req: Request, res: Response) => {
            console.log("[Add-pizza] - try to get...");
            this.pizzaController.addPizza(req, res);
            console.log("-----------------------------");
          });

          
          this.router.post('/add-ingredients-pizza/:id', (req: Request, res: Response) => {
            console.log("[Add-ingredients-pizza] - try to get...");
            this.pizzaController.addIngredientsToPizza(req, res);
            console.log("-----------------------------");
          });


        this.router.get('/all-pizzas/', async (req, res, next) => {
            console.log("[All-pizzas] - try to get...");
            this.pizzaController.getAllPizzas(req, res);
            console.log("-----------------------------");
        });

        this.router.delete('/delete/:id',(req, res, next) => {
            console.log("[Delete] - try to delete (", req.params.id, ")");
            this.pizzaController.deletePizza(req, res);
            console.log("-----------------------------");
        });

        this.router.put('/update-pizza/:id', (req, res, next) => {
            console.log("[Update] - try to update (", req.body, ")");
            this.pizzaController.updatePizza(req, res);
            console.log("-----------------------------");
        });

    }
}