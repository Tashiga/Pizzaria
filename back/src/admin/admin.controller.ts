import { Request, Response } from 'express';
import { AdminService } from './admin.service';

export class AdminController {
    constructor(private adminService: AdminService) {}

    add(req: Request, res: Response): void {
        const admin = req.body;
        this.adminService.add(admin, (error: Error | null, result?: any) => {
            if (error) {
              res.status(500).json({ error: 'Erreur lors de l\'ajout du admin' });
              return;
            }
            res.status(201).json({ message: 'Admin ajouté avec succès' });
          });
    }

    getAllAdmins(req: Request, res: Response): void {
      this.adminService.getAllAdmin((error: Error | null, response?: any[]) => {
        if(error){
          res.status(500).json({ error: 'Erreur lors de la récupération des admins'});
          return;
        }
        res.status(200).send({admins: response});
      })
    }

    getById(req: Request, res: Response): void {
        const id = parseInt(req.params.id);
        this.adminService.getById(id, (error: Error | null, admin?: any) => {
          if (error) {
            res.status(404).json({ error: error.message });
            return;
          }
          res.status(200).json({ admin });
        });
      }

    deleteAdmin(req: Request, res: Response): void{
        const id = parseInt(req.params.id);
        this.adminService.deleteAdmin(id, (error: Error | null, result?: any) => {
            if (error) {
              res.status(500).json({ error: 'Erreur lors de la suppression de l\'admin' });
              return;
            }
            res.status(200).json({ message: 'Admin supprimé avec succès' });
          });

    }

    updateAdmin(req: Request, res: Response): void {
        const id = parseInt(req.params.id);
        const updatedData = req.body;
        this.adminService.updateById(id, updatedData, (error: Error | null, result?: any) => {
            if (error) {
              res.status(500).json({ error: 'Erreur lors de la mise à jour du admin' });
              return;
            }
            res.status(200).json({ message: 'Admin mis à jour avec succès' });
          });
    }
}