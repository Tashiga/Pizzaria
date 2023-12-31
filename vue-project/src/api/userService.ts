import type { User } from '@/model/user';
import axios, { type AxiosResponse } from 'axios';

// const httpClient = axios.create({
//   baseURL: 'http://localhost:3000/api/users', 
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

const UserService = {
    async getUsers() {
        return axios.get('http://localhost:3000/api/users/all-users');
    },

    async getUserById(userId: number): Promise<AxiosResponse<User>> {
        return axios.get<User>(`/user/${userId}`);
    },

    async getUserByUsername(username: string): Promise<AxiosResponse<User[]>>{
        return axios.get<User[]>(`/by-username/${username}`);
    },

    async addUser(newUser: User): Promise<AxiosResponse<User>> {
        console.log("Hello : ", newUser);
        return axios.post<User>('http://localhost:3000/api/users/add-user', newUser);
    },

    async deleteUserbyId(userId: number): Promise<AxiosResponse<void>>{
        return axios.delete<void>(`http://localhost:3000/api/users/delete/${userId}`);
    },

    async updateUser(userId: number, updatedUser: User): Promise<AxiosResponse<User>> {
        return axios.put<User>(`http://localhost:3000/api/users/update-user/${userId}`, updatedUser);
    }
  };
  
  export default UserService;