import { Ingredient } from './ingredient';
import DbConnection from '../database/dbConfig';
import { IngredientService } from './ingredient.service';


export class IngredientJsonService implements IngredientService {
    private database!: DbConnection;


    constructor(private dbconnection: DbConnection) {
        this.database = dbconnection;
    }

    addIngredient(ingredient: Ingredient, callback: (error: Error | null, result?: any) => void): void {
        if(ingredient!== null && ingredient !== undefined){
            const query = 'INSERT INTO ingredient (name) VALUES (?)';
            const values = [ingredient.name];
            console.log('ingredient : ', values);
            this.database.query(query, values, (error: Error | null, result: any) => {
                if (error) {
                    callback(error);
                    return;
                }
                callback(null, result);
            });
        }
    }

    getAllIngredients(callback: (error: Error | null, ingredients?: Ingredient[]) => void): void{
        let dbIngredient : Ingredient[] = [];
        this.database.query('SELECT * FROM ingredient', [], (queryError: Error | null, results: any) => {
            // recupération des users
            dbIngredient = (results as any[]).map((row: any) => ({
                id: row.id,
                name: row.name
            }));
            callback(null, dbIngredient);
        });
    }

    deleteIngredient(id: number, callback: (error: Error | null, result?: any) => void): void{
        const query = 'DELETE FROM ingredient WHERE id = ?';
        this.database.query(query, [id], (error: Error | null, result: any) => {
        if (error) {
            callback(error);
            return;
        }
        callback(null, result);
        });
        
        // throw new Error('3.Method not implemented.');
    }

    updateById(id: number, updatedData: any, callback: (error: Error | null, result?: any) => void): void{
        console.log("udpateData : ", updatedData);
        const query = 'UPDATE ingredient SET ? WHERE id = ?';
        this.database.query(query, [updatedData, id], (error: Error | null, result: any) => {
          if (error) {
            callback(error);
            return;
          }
          callback(null, result);
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
