import { User } from './user';
import { UserService } from './user.service';
import DbConnection from '../database/dbConfig';


export class UserJSONService implements UserService {
    private database!: DbConnection;

    constructor(private dbconnection: DbConnection) {
        this.database = dbconnection;
    }

    add(username: User, callback: (error: Error | null, result?: any) => void): void {
        if(username!== null && username !== undefined){
            const query = 'INSERT INTO user (username) VALUES (?)';
            const values = [username.username];
            console.log('username : ', values);
            this.database.query(query, values, (error: Error | null, result: any) => {
                if (error) {
                    callback(error);
                    return;
                }
                callback(null, result);
            });
        }
        // throw new Error('Method not implemented.');
    }

    getById(id: number, callback: (error: Error | null, user?: any) => void): void {
        const query = 'SELECT * FROM user WHERE id = ?';
        this.database.query(query, [id], (error: Error | null, result: any) => {
            if (result.length === 0) {
                callback(new Error('Utilisateur non trouvé'));
                return;
            }
            const user = result[0];
            callback(null, user);
        });

        // throw new Error('2.Method not implemented.');
    }

    getByUsername(username: string, callback: (error: Error | null, users?: any[]) => void): void {
        const query = 'SELECT * FROM user WHERE username = ?';
        this.database.query(query, [username], (error: Error | null, results: any) => {
          if (error) {
            callback(error);
            return;
          }
          callback(null, results);
        });
        // throw new Error('2.Method not implemented.');
      }
        
    deleteUser(userId: number, callback: (error: Error | null, result?: any) => void): void{   
        const query = 'DELETE FROM user WHERE id = ?';
        this.database.query(query, [userId], (error: Error | null, result: any) => {
        if (error) {
            callback(error);
            return;
        }
        callback(null, result);
        });
        
        // throw new Error('3.Method not implemented.');
    }

    updateById(id: number, updatedData: any, callback: (error: Error | null, result?: any) => void): void {
        const query = 'UPDATE user SET ? WHERE id = ?';
        this.database.query(query, [updatedData, id], (error: Error | null, result: any) => {
          if (error) {
            callback(error);
            return;
          }
          callback(null, result);
        });

        // throw new Error('4.Method not implemented.');
    }

    getAllUsers(callback: (error: Error | null, users?: User[]) => void): void {
        let dbUsers : User[] = [];
        this.database.query('SELECT * FROM user', [], (queryError: Error | null, results: any) => {
            // recupération des users
            dbUsers = (results as any[]).map((row: any) => ({
                id: row.id,
                username: row.username,
            }));
            callback(null, dbUsers);
        });
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
