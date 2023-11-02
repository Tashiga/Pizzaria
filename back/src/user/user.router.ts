import { Router } from 'express';
import { UserController } from './user.controller';
import { User } from './user';

export class UserRouter {
    router = Router();

    constructor(private userController: UserController) {
        this.configureRoutes();
    }

    private configureRoutes(): void {
        this.router.get('/user/:id', (req, res, next) => {
            console.log("[User] - try to get (", req.params.id, ")");
            try {
                const result = this.userController.getById(
                    parseInt(req.params.id),
                );
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
            console.log("-----------------------------");
        });

        this.router.post('/add-user', (req, res, next) => {
            console.log("[Add-user] - try to get...");
            try {
                const result = this.userController.add(req.body.username);
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
            console.log("-----------------------------");
        });

        this.router.get('/all-users/',(req, res, next) => {
            console.log("[All-users] - try to get...");
            try {
                const result = this.userController.getAllUsers();
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            } 
        console.log("-----------------------------");});

        this.router.delete('/delete/:id',(req, res, next) => {
            console.log("[Delete] - try to delete (", req.params.id, ")");
            try {
                const result = this.userController.deleteUser(
                    parseInt(req.params.id),
                );
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
            console.log("-----------------------------");
        });

        this.router.put('/update-user/', (req, res, next) => {
            console.log("[Update] - try to update (", req.body, ")");
            try {
                const result = this.userController.updateUser(
                    req.body,
                );
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
            console.log("-----------------------------");
        });
    }
}