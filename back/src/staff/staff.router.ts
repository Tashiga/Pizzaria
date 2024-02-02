import { Request, Response } from 'express';
import { Router } from 'express';
import { StaffController } from './staff.controller';

export class StaffRouter {
    router = Router();

    constructor(private staffController: StaffController) {
        this.configureRoutes();
    }

    private configureRoutes(): void {

        this.router.get('/staff/:id', (req, res, next) => {
            console.log("[Staff] - try to get (", req.params.id, ")");
            this.staffController.getById(req, res);
            console.log("-----------------------------");
        });

        this.router.post('/add-staff', (req: Request, res: Response) => {
            console.log("[Add-staff] - try to get...");
            this.staffController.add(req, res);
            console.log("-----------------------------");
          });

        this.router.get('/all-staffs/', async (req, res, next) => {
            console.log("[All-staffs] - try to get...");
            this.staffController.getAllStaffs(req, res);
            console.log("-----------------------------");
          });

        this.router.delete('/delete/:id',(req, res, next) => {
            console.log("[Delete] - try to delete (", req.params.id, ")");
            this.staffController.deleteStaff(req, res);
            console.log("-----------------------------");
        });

        this.router.put('/update-staff/:id', (req, res, next) => {
            console.log("[Update] - try to update (", req.body, ")");
            this.staffController.updateStaff(req, res);
            console.log("-----------------------------");
        });
    }
}