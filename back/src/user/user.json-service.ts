import {Role, User} from './user';
import {UserService} from './user.service';
import DbConnection from '../database/dbConfig';
import bcrypt from 'bcrypt';
import { ProfilUser } from './profilUser';

export class UserJSONService implements UserService{

    constructor(private dbconnection: DbConnection) {}

    add(user: User, callback:(error: Error | null, result?: any)=>void): void{
        if(user !== null && user !== undefined) {
            let newUser: User= new User(0, user.nom, user.prenom, user.age, user.role, user.mail, user.identifiant, user.motDePasseHash);
            const query = 'INSERT INTO User (nom, prenom, age, role, mail, identifiant, motDePasseHash) VALUES (?, ?, ?, ?, ?, ?, ?)';
            const values = [newUser.nom, newUser.prenom, newUser.age, newUser.role, newUser.mail, newUser.identifiant, newUser.motDePasseHash];
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
                  row.role,
                  row.mail,
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
        const query = 'SELECT * from user left join staff on user.id = staff.id left join admin on user.id = admin.id left join client on user.id = client.id where user.identifiant = ?';
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
            let user: User = new User(
                result[0].id,
                result[0].nom,
                result[0].prenom,
                result[0].age,
                result[0].role,
                result[0].mail,
                result[0].identifiant,
                undefined,
                result[0].motDePasseHash
            );
            // console.log('user : ', result[0]);
            // verifier le mdp du id
            if(user.verifierMotDePasse(mdp.motDePasseHash)) {
                let profilUser: ProfilUser = new ProfilUser(
                    user.id,
                    user.nom,
                    user.prenom,
                    user.age,
                    user.role
                );
                // console.log("test : ", profilUser);
                if(user.mail && user.identifiant && user.motDePasseHash)
                    profilUser.isAccount(user.mail, user.identifiant, user.motDePasseHash);


                if(user.role == Role.Admin){
                    profilUser.isAdmin(result[0].numTel);
                    console.log("finally user is an admin !");
                }
                else if(user.role == Role.Staff){
                    profilUser.isStaff(result[0].salaryPerMonth, result[0].workHours);
                    console.log("finally user is a staff !");
                }
                else if(user.role == Role.Client){
                    profilUser.isClient(result[0].adresse, result[0].numTel, result[0].bankCard);
                    console.log("finally user is a client !")
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
