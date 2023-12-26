import {Request, Response} from 'express';
import {Router} from 'express';
import { UserController } from './user.controller';

export class UserRouter {
    router = Router();

    constructor(private userController: UserController) {
        this.configureRoutes();
    }

    private configureRoutes() : void {
        this.router.post('/add-user', (req: Request, res: Response) => {
            console.log("[Add-User] - try to get...");
            this.userController.add(req, res);
            console.log("-----------------------------");
        })
        this.router.get('/all-users', async (req, res, next) => {
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

        this.router.post('/checkMdp', (req, res, next) => {
            console.log("[CheckMDP-User] - try to get...");
            console.log("query : ", req.query);
            console.log("body : ", req.body);
            // const { identifiant, motDePasseHash } = req.query;
            this.userController.checkMDP(req, res);
            console.log("-----------------------------");
        });

    }
}