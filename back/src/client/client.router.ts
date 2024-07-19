import { Request, Response } from 'express';
import { Router } from 'express';
import { ClientController } from './client.controller';

export class clientRouter {
    router = Router();

    constructor(private clientController: ClientController) {
        this.configureRoutes();
    }

    private configureRoutes(): void {

        this.router.get('/client/:id', (req, res, next) => {
            console.log("[client] - try to get (", req.params.id, ")");
            this.clientController.getById(req, res);
            console.log("-----------------------------");
        });

        this.router.post('/add-client', (req: Request, res: Response) => {
            console.log("[Add-client] - try to get...");
            this.clientController.add(req, res);
            console.log("-----------------------------");
          });

        this.router.get('/all-clients/', async (req, res, next) => {
            console.log("[All-clients] - try to get...");
            this.clientController.getAllClients(req, res);
            console.log("-----------------------------");
          });

        this.router.delete('/delete/:id',(req, res, next) => {
            console.log("[Delete] - try to delete (", req.params.id, ")");
            this.clientController.deleteClient(req, res);
            console.log("-----------------------------");
        });

        this.router.put('/update-client/:id', (req, res, next) => {
            console.log("[Update] - try to update (", req.body, ")");
            this.clientController.updateClient(req, res);
            console.log("-----------------------------");
        });
    }
}