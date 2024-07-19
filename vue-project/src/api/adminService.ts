import type { Admin } from '@/model/admin';
import axios, { type AxiosResponse } from 'axios';

const AdminService = {
    async getAdmins() {
        return axios.get('http://localhost:3000/api/admins/all-admins');
    },

    async getAdminById(userId: number): Promise<AxiosResponse<Admin>> {
        return axios.get<Admin>(`/admin/${userId}`);
    },

    async addAdmin(newAdmin: Admin): Promise<AxiosResponse<Admin>> {
        console.log("Hello : ", newAdmin);
        return axios.post<Admin>('http://localhost:3000/api/admins/add-admin', newAdmin);
    },

    async deleteAdminbyId(adminId: number): Promise<AxiosResponse<void>>{
        return axios.delete<void>(`http://localhost:3000/api/admins/delete/${adminId}`);
    },

    async updateAdmin(adminId: number, updatedAdmin: Admin): Promise<AxiosResponse<Admin>> {
        return axios.put<Admin>(`http://localhost:3000/api/admins/update-admin/${adminId}`, updatedAdmin);
    }
  };
  
  export default AdminService;