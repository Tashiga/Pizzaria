import { Request, Response } from 'express';
import { Router } from 'express';
import { UserController } from './user.controller';

export class UserRouter {
    router = Router();

    constructor(private userController: UserController) {
        this.configureRoutes();
    }

    private configureRoutes(): void {

        this.router.get('/user/:id', (req, res, next) => {
            console.log("[User] - try to get (", req.params.id, ")");
            this.userController.getById(req, res);
            console.log("-----------------------------");
        });

        this.router.get('/user/by-username/:username', (req, res) => {
            this.userController.getByUsername(req, res);
          })

        this.router.post('/add-user', (req: Request, res: Response) => {
            console.log("[Add-user] - try to get...");
            this.userController.add(req, res);
            console.log("-----------------------------");
          });

        this.router.get('/all-users/', async (req, res, next) => {
            console.log("[All-users] - try to get...");
            this.userController.getAllUsers(req, res);
            console.log("-----------------------------");
          });

        this.router.delete('/delete/:id',(req, res, next) => {
            console.log("[Delete] - try to delete (", req.params.id, ")");
            this.userController.deleteUser(req, res);
            console.log("-----------------------------");
        });

        this.router.put('/update-user/:id', (req, res, next) => {
            console.log("[Update] - try to update (", req.body, ")");
            this.userController.updateUser(req, res);
            console.log("-----------------------------");
        });
    }
}