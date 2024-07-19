import {User} from './user';
import {UserService} from './user.service';
import DbConnection from '../database/dbConfig';
import bcrypt from 'bcryptjs';
import { ProfilUser } from './profilUser';

export class UserJSONService implements UserService{

    constructor(private dbconnection: DbConnection) {}

    add(user: User, callback:(error: Error | null, result?: any)=>void): void{
        if(user !== null && user !== undefined) {
            let newUser: User= new User(0, user.nom, user.prenom, user.age, user.identifiant, user.motDePasseHash);
            const query = 'INSERT INTO User (nom, prenom, age, identifiant, motDePasseHash) VALUES (?, ?, ?, ?, ?)';
            const values = [newUser.nom, newUser.prenom, newUser.age, newUser.identifiant, newUser.motDePasseHash];
            console.log('user : ', values);
            console.log('check mdp : ', newUser);
            if(user.motDePasseHash){
                const bool = newUser.verifierMotDePasse(user.motDePasseHash);
                console.log("bool : ", bool);
            }
            this.dbconnection.query(query, values, (error: Error | null, result: any) => {
                if(error) {
                    callback(error);
                    return;
                }
                console.log('check : ', result.insertId);
                callback(null, result.insertId);
            });
        }
    }

    getAllUsers(callback: (error: Error | null, users ?: User[]) => void): void {
        let users: User[] = [];
        const query = 'SELECT * FROM User';
        this.dbconnection.query(query, [], (error: Error | null, results: any) => {
            users = results.map((row: any) => {
                return new User(
                  row.id,
                  row.nom,
                  row.prenom,
                  row.age,
                  row.identifiant,
                  undefined,
                  row.motDePasseHash
                );
              });
            callback(null, users);
        });
    }

    deleteUser(userId: number, callback: (error: Error | null, result?: any) => void): void{   
        const query = 'DELETE FROM User WHERE id = ?';
        this.dbconnection.query(query, [userId], (error: Error | null, result: any) => {
        if (error) {
            callback(error);
            return;
        }
        callback(null, result);
        });
        
        // throw new Error('3.Method not implemented.');
    }

    updateById(id: number, updatedData: User, callback: (error: Error | null, result?: any) => void): void {
        const query = 'UPDATE User SET ? WHERE id = ?';
        this.dbconnection.query(query, [updatedData, id], (error: Error | null, result: any) => {
          if (error) {
            callback(error);
            return;
          }
          callback(null, result);
        });

        // throw new Error('4.Method not implemented.');
    }

    checkMDP(mdp: {identifiant: string, motDePasseHash: string}, callback: (error: Error | null, result?: any) => void):void {
        // const query = 'SELECT * FROM user natural join admin where identifiant = ?';
        // select (select * from user natural join staff), * from user natural join admin ;
        const query = 'select user.id as id, user.nom, user.prenom, user.age, user.identifiant, user.motDePasseHash, admin.adresseMail, staff.salaryPerMonth, staff.workHours from user left join admin on user.id = admin.id left join staff on user.id = staff.id where user.identifiant=?';
        const query1 = 'SELECT * FROM admin natural join user where id = ?';
        const query2 = 'SELECT * FROM staff natural join user where id = ?';
        this.dbconnection.query(query, [mdp.identifiant], async (error: Error | null, result: any) => {
            if (error) {
              callback(error);
              return;
            } 
            else if(!mdp.motDePasseHash){
                callback(error);
                console.log('mdp null');
                return;
            }
            else if(result.length <= 0) {
                console.log('empty');
                callback(null, {});
                return;
            }
            let isAdmin: boolean = false;
            let isStaff: boolean = false;
            let user: User = new User(
                result[0].id,
                result[0].nom,
                result[0].prenom,
                result[0].age,
                result[0].identifiant,
                undefined,
                result[0].motDePasseHash
            );
            console.log('user : ', result[0]);
            if(user.verifierMotDePasse(mdp.motDePasseHash)) {
                let profilUser: ProfilUser = new ProfilUser(
                    user.id,
                    user.nom,
                    user.prenom,
                    user.age
                );
                console.log("test : ", profilUser);
                if(user.identifiant && user.motDePasseHash)
                    profilUser.isAccount(user.identifiant, user.motDePasseHash);

                await this.isResult2(query1, result[0].id).then(response => {
                    if(response != null && response != undefined) {
                        isAdmin = response;
                    }
                });

                await this.isResult2(query2, result[0].id).then(response => {
                    if(response != null && response != undefined) {
                        isStaff = response;
                    }
                });

                if(isAdmin){
                    profilUser.isAdmin(result[0].adresseMail);
                    console.log("finally user is an admin !");
                }
                else if(isStaff){
                    profilUser.isStaff(result[0].salaryPerMonth, result[0].workHours);
                    console.log("finally user is a staff !");
                }
                else {
                    console.log("finally type of user cannot find !");
                }
                console.log("profilUser : ", profilUser);
                callback(null, profilUser);
            }
            else {
                callback(null, {});
            }
            
          });
    }

    async isResult2(query: string, id: number): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.dbconnection.query(query, [id], (error: Error | null, result: any) => {
                if (error) {
                    console.error("Erreur lors de la requête :", error);
                    resolve(false);
                } else if (result.length <= 0) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            });
        });
    }


}
