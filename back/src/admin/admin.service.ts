import { Admin } from "./admin";

export interface AdminService {
    add(admin: Admin, callback: (error: Error | null, result?: any) => void): void;
    getAllAdmin(callback: (error: Error | null, responses?: Admin[])=> void): void;
    getById(id: number, callback: (error: Error | null, admin?: any) => void): void ;
    deleteAdmin(id: number, callback: (error: Error | null, result?: any) => void): void;
    updateById(id: number, updatedData: any, callback: (error: Error | null, result?: any) => void): void;
    // decoDB():void;
}