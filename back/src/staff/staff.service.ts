import { Staff } from "./staff";

export interface StaffService {
    add(staff: Staff, callback: (error: Error | null, result?: any) => void): void;
    getAllStaffs(callback: (error: Error | null, responses?: Staff[])=> void): void;
    getById(id: number, callback: (error: Error | null, staff?: any) => void): void ;
    deleteStaff(id: number, callback: (error: Error | null, result?: any) => void): void;
    updateById(id: number, updatedData: any, callback: (error: Error | null, result?: any) => void): void;
    // decoDB():void;
}