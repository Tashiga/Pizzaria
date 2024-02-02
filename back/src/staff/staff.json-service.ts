import { Staff } from './staff';
import { StaffService } from './staff.service';
import DbConnection from '../database/dbConfig';


export class StaffJSONService implements StaffService {

    constructor(private dbconnection: DbConnection) {}

    add(staff: Staff, callback: (error: Error | null, result?: any) => void): void {
        if(staff!== null && staff !== undefined){
            const query = 'INSERT INTO Staff (id, salaryPerMonth, workHours) VALUES (?, ?, ?)';
            const values = [staff.id, staff.salaryPerMonth, staff.workHours];
            console.log('staff : ', values);
            this.dbconnection.query(query, values, (error: Error | null, result: any) => {
                if (error) {
                    callback(error);
                    return;
                }
                callback(null, result);
            });
        }
        // throw new Error('Method not implemented.');
    }

    getAllStaffs(callback: (error: Error | null, responses?: Staff[])=> void): void{
        let dbStaff: Staff[] = [];
        const query = 'SELECT * FROM Staff natural join User';
        this.dbconnection.query(query, [], (error: Error | null, result: any) => {
            dbStaff = (result as any[]).map((row: any) => {
                return new Staff(
                    row.id,
                    row.nom,
                    row.prenom,
                    row.age,
                    row.salaryPerMonth,
                    row.workHours
                );
            });
            callback(null, dbStaff);
        });
    }


    getById(id: number, callback: (error: Error | null, staff?: any) => void): void {
        const query = 'SELECT * FROM staff WHERE id = ?';
        this.dbconnection.query(query, [id], (error: Error | null, result: any) => {
            if (result.length === 0) {
                callback(new Error('Staff non trouvé'));
                return;
            }
            const user = result[0];
            callback(null, user);
        });

        // throw new Error('2.Method not implemented.');
    }

    deleteStaff(id: number, callback: (error: Error | null, result?: any) => void): void{   
        const query = 'DELETE FROM staff WHERE id = ?';
        this.dbconnection.query(query, [id], (error: Error | null, result: any) => {
        if (error) {
            callback(error);
            return;
        }
        callback(null, result);
        });
        
        // throw new Error('3.Method not implemented.');
    }

    updateById(id: number, updatedData: any, callback: (error: Error | null, result?: any) => void): void {
        const query = 'UPDATE staff SET ? WHERE id = ?';
        const toUpdate : {} = {'id' : updatedData.id, 'salaryPerMonth' : updatedData.salaryPerMonth, 'workHours' : updatedData.workHours};
        this.dbconnection.query(query, [toUpdate, id], (error: Error | null, result: any) => {
          if (error) {
            callback(error);
            return;
          }
          callback(null, result);
        });

        // throw new Error('4.Method not implemented.');
    }


    //   rajouter une fonction qui permet de deconnecter de la base : 
    // decoDB():void {
    //     this.database.close((closeError: Error | null) => {
    //         if (closeError) {
    //             console.error('Erreur lors de la fermeture de la connexion :', closeError);
    //         }
    //     });
    // }
}
