import { Request, Response } from 'express';
import { StaffService } from './staff.service';

export class StaffController {
    constructor(private staffService: StaffService) {}

    add(req: Request, res: Response): void {
        const staff = req.body;
        this.staffService.add(staff, (error: Error | null, result?: any) => {
            if (error) {
              res.status(500).json({ error: 'Erreur lors de l\'ajout du staff' });
              return;
            }
            res.status(201).json({ message: 'Staff ajouté avec succès' });
          });
    }

    getAllStaffs(req: Request, res: Response): void {
      this.staffService.getAllStaffs((error: Error | null, response?: any[]) => {
        if(error){
          res.status(500).json({ error: 'Erreur lors de la récupération des staffs'});
          return;
        }
        res.status(200).send({staffs: response});
      })
    }

    getById(req: Request, res: Response): void {
        const id = parseInt(req.params.id);
        this.staffService.getById(id, (error: Error | null, user?: any) => {
          if (error) {
            res.status(404).json({ error: error.message });
            return;
          }
          res.status(200).json({ user });
        });
      }

    deleteStaff(req: Request, res: Response): void{
        const id = parseInt(req.params.id);
        this.staffService.deleteStaff(id, (error: Error | null, result?: any) => {
            if (error) {
              res.status(500).json({ error: 'Erreur lors de la suppression du Staff' });
              return;
            }
            res.status(200).json({ message: 'Staff supprimé avec succès' });
          });

    }

    updateStaff(req: Request, res: Response): void {
        const id = parseInt(req.params.id);
        const updatedData = req.body;
        this.staffService.updateById(id, updatedData, (error: Error | null, result?: any) => {
            if (error) {
              res.status(500).json({ error: 'Erreur lors de la mise à jour du Staff' });
              return;
            }
            res.status(200).json({ message: 'Staff mis à jour avec succès' });
          });
    }
}