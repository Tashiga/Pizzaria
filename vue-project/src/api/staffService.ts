import type { Staff } from '@/model/staff';
import axios, { type AxiosResponse } from 'axios';

const URL : string = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const API : string = URL + '/api/staffs/';

const StaffService = {
    async getStaffs() {
        return axios.get(API + '/all-staffs');
    },

    async getStaffById(userId: number): Promise<AxiosResponse<Staff>> {
        return axios.get<Staff>(`/staff/${userId}`);
    },

    // async getUserByUsername(username: string): Promise<AxiosResponse<Staff[]>>{
    //     return axios.get<Staff[]>(`/by-username/${username}`);
    // },

    async addStaff(newStaff: Staff): Promise<AxiosResponse<Staff>> {
        console.log("Hello : ", newStaff);
        return axios.post<Staff>(API + '/add-staff', newStaff);
    },

    async deleteStaffbyId(staffId: number): Promise<AxiosResponse<void>>{
        return axios.delete<void>(API + `/delete/${staffId}`);
    },

    async updateStaff(staffId: number, updatedStaff: Staff): Promise<AxiosResponse<Staff>> {
        return axios.put<Staff>(API + `/update-staff/${staffId}`, updatedStaff);
    }
  };
  
  export default StaffService;