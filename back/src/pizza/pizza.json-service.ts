import { Pizza } from './pizza';
import { PizzaService } from './pizza.service';
import DbConnection from '../database/dbConfig';


export class PizzaJSONService implements PizzaService {
    private database!: DbConnection;

    constructor(private dbconnection: DbConnection) {
        this.database = dbconnection;
    }

    
    addPizza(pizza: Pizza, callback: (error: Error | null, result?: any) => void): void {
        if(pizza!== null && pizza !== undefined){
            const query = 'INSERT INTO pizza (name, price) VALUES (?, ?)';
            const values = [pizza.name, pizza.price];
            console.log('pizza : ', values);
            this.database.query(query, values, (error: Error | null, result: any) => {
                if (error) {
                    callback(error);
                    return;
                }
                callback(null, result);
            });
        }
    }

    addIngredientsToPizza(pizzaId: number, ingredientIds: number[]): Promise<any[]> {
        if (pizzaId && ingredientIds && ingredientIds.length > 0) {
            return new Promise<any[]>(async (resolve, reject) => {
                const query = 'INSERT INTO Pizza_Ingredient (pizzaId, ingredientId) VALUES (?, ?);';
                const results: any[] = [];
    
                try {
                    for (const id of ingredientIds) {
                        const values = [pizzaId, id];
                        console.log('pizza-ingredient : ', values);
                        const result = await this.database.query(query, values, (error: Error | null, result: any) => {});
                        results.push(result);
                    }
                    resolve(results);
                } catch (error: any) {
                    reject(new Error('Erreur lors de l\'ajout des ingrédients à la pizza: ' + error.message));
                }
            });
        } else {
            return Promise.reject(new Error('Données manquantes pour ajouter des ingrédients à la pizza.'));
        }
    }

    getAllPizzas(callback: (error: Error | null, pizzas?: Pizza[]) => void): void{
        let dbPizzas : Pizza[] = [];
        this.database.query('SELECT * FROM pizza', [], (queryError: Error | null, results: any) => {
            // recupération des pizzas
            dbPizzas = (results as any[]).map((row: any) => ({
                id: row.id,
                name: row.name,
                price: row.price
            }));
            callback(null, dbPizzas);
        });
    }

    deletePizza(id: number, callback: (error: Error | null, result?: any) => void): void{
        const query = 'DELETE FROM pizza WHERE id = ?';
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
        const query = 'UPDATE pizza SET ? WHERE id = ?';
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
