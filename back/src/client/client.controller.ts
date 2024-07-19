import { Request, Response } from 'express';
import { ClientService } from './client.service';

export class ClientController {
    constructor(private clientService: ClientService) {}

    add(req: Request, res: Response): void {
        const client = req.body;
        this.clientService.add(client, (error: Error | null, result?: any) => {
            if (error) {
              res.status(500).json({ error: 'Erreur lors de l\'ajout du client' });
              return;
            }
            res.status(201).json({ message: 'Client ajouté avec succès' });
          });
    }

    getAllClients(req: Request, res: Response): void {
      this.clientService.getAllClients((error: Error | null, response?: any[]) => {
        if(error){
          res.status(500).json({ error: 'Erreur lors de la récupération des clients'});
          return;
        }
        res.status(200).send({clients: response});
      })
    }

    getById(req: Request, res: Response): void {
        const id = parseInt(req.params.id);
        this.clientService.getById(id, (error: Error | null, client?: any) => {
          if (error) {
            res.status(404).json({ error: error.message });
            return;
          }
          res.status(200).json({ client });
        });
      }

    deleteClient(req: Request, res: Response): void{
        const id = parseInt(req.params.id);
        this.clientService.deleteClient(id, (error: Error | null, result?: any) => {
            if (error) {
              res.status(500).json({ error: 'Erreur lors de la suppression du client' });
              return;
            }
            res.status(200).json({ message: 'Client supprimé avec succès' });
          });

    }

    updateClient(req: Request, res: Response): void {
        const id = parseInt(req.params.id);
        const updatedData = req.body;
        this.clientService.updateById(id, updatedData, (error: Error | null, result?: any) => {
            if (error) {
              res.status(500).json({ error: 'Erreur lors de la mise à jour du client' });
              return;
            }
            res.status(200).json({ message: 'Client mis à jour avec succès' });
          });
    }
}