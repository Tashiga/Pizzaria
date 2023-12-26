import { Router } from 'express';
import { Request, Response } from 'express';
import { IngredientController } from './ingredient.controller';

export class IngredientRouter {
    router = Router();

    constructor(private ingredientController: IngredientController) {
        this.configureRoutes();
    }

    private configureRoutes(): void {

        this.router.post('/add-ingredient', (req: Request, res: Response) => {
            console.log("[Add-ingredient] - try to get...");
            this.ingredientController.addIngredient(req, res);
            console.log("-----------------------------");
          });

        this.router.get('/all-ingredients/', async (req, res, next) => {
            console.log("[All-users] - try to get...");
            this.ingredientController.getAllIngredients(req, res);
            console.log("-----------------------------");
        });

        this.router.delete('/delete/:id',(req, res, next) => {
            console.log("[Delete] - try to delete (", req.params.id, ")");
            this.ingredientController.deleteIngredient(req, res);
            console.log("-----------------------------");
        });

        this.router.put('/update-ingredient/:id', (req, res, next) => {
            console.log("[Update] - try to update (", req.body, ")");
            this.ingredientController.updateIngredient(req, res);
            console.log("-----------------------------");
        });

    }
}
