import { Client } from "./client";

export interface ClientService {
    add(client: Client, callback: (error: Error | null, result?: any) => void): void;
    getAllClients(callback: (error: Error | null, responses?: Client[])=> void): void;
    getById(id: number, callback: (error: Error | null, client?: any) => void): void ;
    deleteClient(id: number, callback: (error: Error | null, result?: any) => void): void;
    updateById(id: number, updatedData: any, callback: (error: Error | null, result?: any) => void): void;
    // decoDB():void;
}