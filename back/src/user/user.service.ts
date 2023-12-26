import {User} from "./user";

export interface UserService {
    add(user: User, callback:(error: Error | null, result?: any)=>void): void;
    getAllUsers(callback: (error: Error | null, users ?: User[]) => void): void;
    deleteUser(id: number, callback: (error: Error | null, result ?: any) => void): void;
    updateById(id: number, updatedData: User, callback: (error: Error | null, result?: any) => void): void;
    checkMDP(mdp: {identifiant: string, motDePasseHash: string}, callback: (error: Error | null, result?: any) => void):void;
    // decoDB(): void;

}