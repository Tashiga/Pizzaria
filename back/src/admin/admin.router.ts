import { Request, Response } from 'express';
import { Router } from 'express';
import { AdminController } from './admin.controller';

export class AdminRouter {
    router = Router();

    constructor(private adminController: AdminController) {
        this.configureRoutes();
    }

    private configureRoutes(): void {

        this.router.get('/admin/:id', (req, res, next) => {
            console.log("[Admin] - try to get (", req.params.id, ")");
            this.adminController.getById(req, res);
            console.log("-----------------------------");
        });

        this.router.post('/add-admin', (req: Request, res: Response) => {
            console.log("[Add-admin] - try to get...");
            this.adminController.add(req, res);
            console.log("-----------------------------");
          });

        this.router.get('/all-admins/', async (req, res, next) => {
            console.log("[All-admins] - try to get...");
            this.adminController.getAllAdmins(req, res);
            console.log("-----------------------------");
          });

        this.router.delete('/delete/:id',(req, res, next) => {
            console.log("[Delete] - try to delete (", req.params.id, ")");
            this.adminController.deleteAdmin(req, res);
            console.log("-----------------------------");
        });

        this.router.put('/update-admin/:id', (req, res, next) => {
            console.log("[Update] - try to update (", req.body, ")");
            this.adminController.updateAdmin(req, res);
            console.log("-----------------------------");
        });
    }
}