import type { Client } from '@/model/client';
import axios, { type AxiosResponse } from 'axios';

const ClientService = {
    async getClients() {
        return axios.get('http://localhost:3000/api/clients/all-clients');
    },

    async getClientById(userId: number): Promise<AxiosResponse<Client>> {
        return axios.get<Client>(`/client/${userId}`);
    },

    async addClient(newClient: Client): Promise<AxiosResponse<Client>> {
        console.log("Hello : ", newClient);
        return axios.post<Client>('http://localhost:3000/api/clients/add-client', newClient);
    },

    async deleteClientById(clientId: number): Promise<AxiosResponse<void>>{
        return axios.delete<void>(`http://localhost:3000/api/clients/delete/${clientId}`);
    },

    async updateClient(clientId: number, updatedClient: Client): Promise<AxiosResponse<Client>> {
        return axios.put<Client>(`http://localhost:3000/api/clients/update-client/${clientId}`, updatedClient);
    }
  };
  
  export default ClientService;