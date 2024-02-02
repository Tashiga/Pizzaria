import type { Staff } from '@/model/staff';
import axios, { type AxiosResponse } from 'axios';

const StaffService = {
    async getStaffs() {
        return axios.get('http://localhost:3000/api/staffs/all-staffs');
    },

    async getStaffById(userId: number): Promise<AxiosResponse<Staff>> {
        return axios.get<Staff>(`/staff/${userId}`);
    },

    // async getUserByUsername(username: string): Promise<AxiosResponse<Staff[]>>{
    //     return axios.get<Staff[]>(`/by-username/${username}`);
    // },

    async addStaff(newStaff: Staff): Promise<AxiosResponse<Staff>> {
        console.log("Hello : ", newStaff);
        return axios.post<Staff>('http://localhost:3000/api/staffs/add-staff', newStaff);
    },

    async deleteStaffbyId(staffId: number): Promise<AxiosResponse<void>>{
        return axios.delete<void>(`http://localhost:3000/api/staffs/delete/${staffId}`);
    },

    async updateStaff(staffId: number, updatedStaff: Staff): Promise<AxiosResponse<Staff>> {
        return axios.put<Staff>(`http://localhost:3000/api/staffs/update-staff/${staffId}`, updatedStaff);
    }
  };
  
  export default StaffService;