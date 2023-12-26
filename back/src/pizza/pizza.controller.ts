import { Request, Response } from 'express';
import { PizzaService } from './pizza.service';

export class PizzaController {
    constructor(private pizzaService: PizzaService) {}

    addPizza(req: Request, res: Response): void {
        const pizza = req.body;
        this.pizzaService.addPizza(pizza, (error: Error | null, result?: any) => {
            if (error) {
              res.status(500).json({ error: 'Erreur lors de l\'ajout du pizza' });
              return;
            }
            res.status(201).json({ message: 'pizza ajouté avec succès' });
          });
    }

    async addIngredientsToPizza(req: Request, res: Response) : Promise<void> {
      const pizzaId = parseInt(req.params.id);
      const ingredientIds = req.body;
      this.pizzaService.addIngredientsToPizza(pizzaId, ingredientIds);
      res.status(200).send({ message: 'ok' });
    }

    getAllPizzas(req: Request, res: Response): void {
        this.pizzaService.getAllPizzas(
            (error: Error | null, pizzas?: any[]) => {
                if (error) {
                  res.status(500).json({ error: 'Erreur lors de la récupération des pizzas' });
                  return;
                }
                res.status(200).send({ pizzas: pizzas });
              }
        );
    }

    deletePizza(req: Request, res: Response): void{
        const pizzaId = parseInt(req.params.id);
        this.pizzaService.deletePizza(pizzaId, (error: Error | null, result?: any) => {
            if (error) {
              res.status(500).json({ error: 'Erreur lors de la suppression du pizza' });
              return;
            }
            res.status(200).json({ message: 'pizza supprimé avec succès' });
          });

    }

    updatePizza(req: Request, res: Response): void {
        const pizzaId = parseInt(req.params.id);
        const updatedData = req.body;
        this.pizzaService.updateById(pizzaId, updatedData, (error: Error | null, result?: any) => {
            if (error) {
              res.status(500).json({ error: 'Erreur lors de la mise à jour du pizza' });
              return;
            }
            res.status(200).json({ message: 'pizza mis à jour avec succès' });
          });
    }
}