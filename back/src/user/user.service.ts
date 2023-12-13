import { User } from "./user";

export interface UserService {
    add(username: User, callback: (error: Error | null, result?: any) => void): void;
    getById(id: number, callback: (error: Error | null, user?: any) => void): void ;
    getByUsername(username: string, callback: (error: Error | null, users?: any) => void): void;
    deleteUser(id: number, callback: (error: Error | null, result?: any) => void): void;
    updateById(id: number, updatedData: any, callback: (error: Error | null, result?: any) => void): void;
    getAllUsers(callback: (error: Error | null, users?: User[]) => void): void;
    // decoDB():void;
}