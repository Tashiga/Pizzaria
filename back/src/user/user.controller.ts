import {Request, Response, response} from 'express';
import { UserService } from './user.service';
import { User } from './user';

export class UserController {
    constructor(private userService: UserService){}

    add(req: Request, res: Response): void {
        const user = req.body;
        this.userService.add(user, (error: Error | null, result?: any) => {
            if (error) {
              res.status(500).json({ error: 'Erreur lors de l\'user' });
              return;
            }
            res.status(201).json({ id: result });
          });
    }

    getAllUsers(req: Request, res: Response): void {
        this.userService.getAllUsers(
            (error: Error | null, users ?: any[]) => {
                if(error) {
                    res.status(500).json({error: 'Erreur lors de la récupération des Users'});
                    return;
                }
                res.status(200).send({users: users});
            }
        )
    }

    deleteUser(req: Request, res: Response): void{
        const userId = parseInt(req.params.id);
        this.userService.deleteUser(userId, (error: Error | null, result?: any) => {
            if (error) {
                res.status(500).json({ error: 'Erreur lors de la suppression de l\'User' });
                return;
            }
            res.status(200).json({ message: 'User supprimé avec succès' });
        });

    }

    updateUser(req: Request, res: Response): void {
        const userId = parseInt(req.params.id);
        const updatedData = req.body;
        this.userService.updateById(userId, updatedData, (error: Error | null, result?: any) => {
            if (error) {
                res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'User' });
                return;
            }
            res.status(200).json({ message: 'User mis à jour avec succès' });
        });
    }

    checkMDP(req: Request, res: Response): void{
        const mdp : {identifiant: string, motDePasseHash: string} = req.body;
        console.log('Données reçues depuis le front :', req.query)
        // console.log('body : ', req.body)
        this.userService.checkMDP(mdp, (error: Error | null, result?: any) => {
            console.log('res : ', result);
            if (error) {
                res.status(500).json({ error: 'Erreur lors du check MDP' });
                return;
            }
            // else if(result != null){
            //     res.status(500).json(null);
            //     return;
            // }
            res.status(200).json({ result: result });
        });
    }

}