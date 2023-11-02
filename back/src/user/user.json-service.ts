import { User } from './user';
import { UserService } from './user.service';
import * as fs from 'fs';
// import { v4 as uuidv4 } from 'uuid';

export class UserJSONService implements UserService {

    add(username: string): User {
        if(username!== null || username !== undefined){
            //need to check if username already exist
            // if(this.getByUsername(username)==null){
                try {
                    let user:User = {
                        username: username,
                        id: 4
                    };
                    const data = fs.readFileSync('data.json', 'utf-8');
                    const users: User[] = JSON.parse(data);
                    //need to check if user already exists
                    users.push(user);
                    const jsonString = JSON.stringify(users);
                    fs.writeFileSync('data.json', jsonString, 'utf-8');
                    console.log('Fichier JSON créé avec succès.');
                  } catch (error) {
                    console.error('Erreur lors de la création du fichier JSON :', error);
                  }
            // }
            // else {
            //     console.log("username already exists !");'
            // }
            //add new user in data file
            
        }
        return {username: username, id:4};
        // throw new Error('Method not implemented.');
    }

    getById(id: number): User | null {
        let user:User|undefined;
        try {
            const data = fs.readFileSync('data.json', 'utf-8');
            const users: User[] = JSON.parse(data);
            user = users.find(user=> user.id === id);
            console.log('user finded :', user);
        }
        catch(error){
            console.error('Erreur lors de la conversion du JSON :', error);
        }
        
        if(user !== undefined) 
            return user;
        else 
            return null;
        // throw new Error('2.Method not implemented.');
    }

    // getUsers(): User[] {
    //     let users: User[] = [];
    //     try {
    //         const data = fs.readFileSync('data.json', 'utf-8');
    //         const allUsers : User[] = JSON.parse(data);
    //         console.log('2.Contenu du fichier JSON :', users);
    //         users = allUsers;
    //     }
    //     catch(error){
    //         console.error('Erreur lors de la conversion du JSON :', error);
    //     }
    //     console.log("users: ", users);
    //     return users;

    // }

    getByUsername(username: string): User | null {
        let user:User|undefined;
        try {
            const data = fs.readFileSync('data.json', 'utf-8');
            const users: User[] = JSON.parse(data);
            console.log('Contenu du fichier JSON :', users.length, "\nuser : ", users.find(user=> user.username === username));
            user = users.find(user=> user.username === username);
        }
        catch(error){
            console.error('Erreur lors de la conversion du JSON :', error);
        }
        
        if(user !== undefined) 
            return user;
        else 
            return null;
        // throw new Error('2.Method not implemented.');
    }

    deleteUser(id: number): void{
        let userIndex:number;
        try {
            const data = fs.readFileSync('data.json', 'utf-8');
            const users: User[] = JSON.parse(data);
            userIndex = users.findIndex(user=> user.id === id);
            console.log('user finded at :', userIndex);
            if(userIndex===0) 
                users.shift();
            else 
                users.splice(userIndex, userIndex);
            const jsonString = JSON.stringify(users);
            fs.writeFileSync('data.json', jsonString, 'utf-8');
            console.log('User deleted from Fichier JSON.');
        }
        catch(error){
            console.error('Erreur lors de la conversion du JSON :', error);
        }
        
        // throw new Error('3.Method not implemented.');
    }

    updateById(userToUpdate: User): void{
        let userIndex:number;
        try {
            const data = fs.readFileSync('data.json', 'utf-8');
            const users: User[] = JSON.parse(data);
            userIndex = users.findIndex(user=> user.id === userToUpdate.id);
            console.log('user finded at :', userIndex);
            users[userIndex].username = userToUpdate.username;
            const jsonString = JSON.stringify(users);
            fs.writeFileSync('data.json', jsonString, 'utf-8');
            console.log('User update from Fichier JSON.');
        }
        catch(error){
            console.error('Erreur lors de la conversion du JSON :', error);
        }
        // throw new Error('4.Method not implemented.');
    }

    getAllUsers(): User[]{
        let usersToReturn: User[] = [];
        try {
            const data = fs.readFileSync('data.json', 'utf-8');
            const users: User[] = JSON.parse(data);
            console.log('Contenu du fichier JSON :', users.length,);
            for (let index = 0; index < users.length; index++) {
                usersToReturn.push(users[index]);
            }
            console.log("finally users : ", usersToReturn);
        }
        catch(e) {
            console.log("error : ", e);
        }
        finally {
            return usersToReturn;
        }
       
    }
      
}