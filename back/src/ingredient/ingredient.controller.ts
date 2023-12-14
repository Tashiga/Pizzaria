import { Request, Response } from 'express';
import { IngredientService } from './ingredient.service';

export class IngredientController {

    constructor(private ingredientService: IngredientService) {}

    addIngredient(req: Request, res: Response): void {
        const ingredient = req.body;
        this.ingredientService.addIngredient(ingredient, (error: Error | null, result?: any) => {
            if (error) {
              res.status(500).json({ error: 'Erreur lors de l\'ajout de l\'ingredient' });
              return;
            }
            res.status(201).json({ message: 'ingredient ajouté avec succès' });
          });
    }

    getAllIngredients(req: Request, res: Response): void {
        this.ingredientService.getAllIngredients(
            (error: Error | null, ingredients?: any[]) => {
                if (error) {
                  res.status(500).json({ error: 'Erreur lors de la récupération des ingrédients' });
                  return;
                }
                res.status(200).send({ ingredients: ingredients });
              }
        );
    }

    deleteIngredient(req: Request, res: Response): void{
        const ingredientId = parseInt(req.params.id);
        this.ingredientService.deleteIngredient(ingredientId, (error: Error | null, result?: any) => {
            if (error) {
              res.status(500).json({ error: 'Erreur lors de la suppression de l\'ingrédient' });
              return;
            }
            res.status(200).json({ message: 'ingrédient supprimé avec succès' });
          });

    }

    updateIngredient(req: Request, res: Response): void {
        const ingredientId = parseInt(req.params.id);
        const updatedData = req.body;
        this.ingredientService.updateById(ingredientId, updatedData, (error: Error | null, result?: any) => {
            if (error) {
              res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'ingrédient' });
              return;
            }
            res.status(200).json({ message: 'ingrédient mis à jour avec succès' });
          });
    }
}
