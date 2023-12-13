import { Request, Response } from 'express';
import { UserService } from './user.service';

export class UserController {
    constructor(private userService: UserService) {}

    add(req: Request, res: Response): void {
        const username = req.body;
        this.userService.add(username, (error: Error | null, result?: any) => {
            if (error) {
              res.status(500).json({ error: 'Erreur lors de l\'ajout de l\'utilisateur' });
              return;
            }
            res.status(201).json({ message: 'Utilisateur ajouté avec succès' });
          });
    }

    getById(req: Request, res: Response): void {
        const id = parseInt(req.params.id);
        this.userService.getById(id, (error: Error | null, user?: any) => {
          if (error) {
            res.status(404).json({ error: error.message });
            return;
          }
          res.status(200).json({ user });
        });
      }

    getByUsername(req: Request, res: Response): void {
        const {username} = req.params; 
        this.userService.getByUsername(username, (error: Error | null, users?: any[]) => {
        if (error) {
            res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
            return;
        }
        res.status(200).json({ users });
        });

    }

    getAllUsers(req: Request, res: Response) : void {
        this.userService.getAllUsers(
            (error: Error | null, users?: any[]) => {
                if (error) {
                  res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
                  return;
                }
                res.status(200).send({ users: users });
              }
        );
    }

    deleteUser(req: Request, res: Response): void{
        const userId = parseInt(req.params.id);
        this.userService.deleteUser(userId, (error: Error | null, result?: any) => {
            if (error) {
              res.status(500).json({ error: 'Erreur lors de la suppression de l\'utilisateur' });
              return;
            }
            res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
          });

    }

    updateUser(req: Request, res: Response): void {
        const userId = parseInt(req.params.id);
        const updatedData = req.body;
        this.userService.updateById(userId, updatedData, (error: Error | null, result?: any) => {
            if (error) {
              res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'utilisateur' });
              return;
            }
            res.status(200).json({ message: 'Utilisateur mis à jour avec succès' });
          });
    }
}