import { Admin } from './admin';
import { User } from '../user/user';
import { AdminService } from './admin.service';
import DbConnection from '../database/dbConfig';


export class AdminJSONService implements AdminService {

    constructor(private dbconnection: DbConnection) {}


    add(admin: Admin, callback: (error: Error | null, result?: any) => void): void{
        if(admin !== null && admin !== undefined) {
            const query = 'INSERT INTO Admin (id, adresseMail) VALUES(?, ?)';
            const values = [admin.id, admin.adresseMail];
            console.log('admin : ', values);
            this.dbconnection.query(query, values, (error : Error | null, result: any) => {
                if(error) {
                    callback(error);
                    return;
                }
                callback(null, result);
            });
        }
    }

    getAllAdmin(callback: (error: Error | null, responses?: Admin[])=> void): void{
        let dbAdmins: Admin[] = [];
        const query = 'SELECT * FROM Admin NATURAL JOIN User';
        this.dbconnection.query(query, [], (error: Error | null, result: any)=> {
            dbAdmins = (result as any[]).map((row: any) => {
                return new Admin(
                    row.id, 
                    row.nom, 
                    row.prenom, 
                    row.age, 
                    row.identifiant, 
                    row.motDePasseHash, 
                    row.adresseMail
                );
            });
            callback(null, dbAdmins);
        })
    }

    getById(id: number, callback: (error: Error | null, admin?: any) => void): void{
        const query = 'SELECT * FROM Admin WHERE id = ?';
        this.dbconnection.query(query, [id], (error: Error | null, result: any) => {
            if (result.length === 0) {
                callback(new Error('Admin non trouvé'));
                return;
            }
            const admin = result[0];
            callback(null, admin);
        });

        // throw new Error('2.Method not implemented.');
    }

    deleteAdmin(id: number, callback: (error: Error | null, result?: any) => void): void{
        const query = 'DELETE FROM Admin WHERE id = ?';
        this.dbconnection.query(query, [id], (error: Error | null, result: any) => {
        if (error) {
            callback(error);
            return;
        }
        callback(null, result);
        });
        
        // throw new Error('3.Method not implemented.');
    }

    updateById(id: number, updatedData: any, callback: (error: Error | null, result?: any) => void): void{
        const query = 'UPDATE Admin SET ? WHERE id = ?';
        const toUpdate : {} = {
            'id' : id, 
            'adresseMail' : updatedData.adresseMail};
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
