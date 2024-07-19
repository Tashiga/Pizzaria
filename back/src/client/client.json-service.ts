import { Client } from './client';
import { User } from '../user/user';
import { ClientService } from './client.service';
import DbConnection from '../database/dbConfig';


export class ClientJSONService implements ClientService {

    constructor(private dbconnection: DbConnection) {}


    add(client: Client, callback: (error: Error | null, result?: any) => void): void{
        if(client !== null && client !== undefined) {
            const query = 'INSERT INTO Client (id, numTel) VALUES(?, ?)'; //to change
            const values = [client.id, client.numTel];
            console.log('client : ', values);
            this.dbconnection.query(query, values, (error : Error | null, result: any) => {
                if(error) {
                    callback(error);
                    return;
                }
                callback(null, result);
            });
        }
    }

    getAllClients(callback: (error: Error | null, responses?: Client[])=> void): void{
        let dbClients: Client[] = [];
        const query = 'SELECT * FROM Client NATURAL JOIN User'; //to change
        this.dbconnection.query(query, [], (error: Error | null, result: any)=> {
            dbClients = (result as any[]).map((row: any) => {
                return new Client(
                    row.id, 
                    row.nom, 
                    row.prenom, 
                    row.age, 
                    row.role,
                    row.mail,
                    row.identifiant, 
                    row.motDePasseHash, 
                    row.numTel
                );
            });
            callback(null, dbClients);
        })
    }

    getById(id: number, callback: (error: Error | null, client?: any) => void): void{
        const query = 'SELECT * FROM Client WHERE id = ?'; //to change
        this.dbconnection.query(query, [id], (error: Error | null, result: any) => {
            if (result.length === 0) {
                callback(new Error('Client non trouvé'));
                return;
            }
            const client = result[0];
            callback(null, client);
        });

        // throw new Error('2.Method not implemented.');
    }

    deleteClient(id: number, callback: (error: Error | null, result?: any) => void): void{
        const query = 'DELETE FROM Client WHERE id = ?'; //to change
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
        const query = 'UPDATE Client SET ? WHERE id = ?'; //to change
        const toUpdate : {} = {
            'id' : id, 
            'numTel' : updatedData.numTel};
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
