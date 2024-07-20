import {User} from '@/model/user'
import axios, { type AxiosResponse } from 'axios';

const URL : string = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const API : string = URL + '/api/users/';

const UserService = {
    async getUsers() {
        return axios.get(API + '/all-users');
    },

    // async getUserById(userId: number): Promise<AxiosResponse<User>> {
    //     return axios.get<User>(`/user/${userId}`);
    // },

    // async getUserByUsername(username: string): Promise<AxiosResponse<Staff[]>>{
    //     return axios.get<Staff[]>(`/by-username/${username}`);
    // },

    async addUser(newUser: User): Promise<AxiosResponse<User>> {
        console.log("Hello : ", newUser);
        return axios.post<User>(API + '/add-user', newUser);
    },

    async deleteUserbyId(userId: number): Promise<AxiosResponse<void>>{
        return axios.delete<void>(API + `/delete/${userId}`);
    },

    async updateUser(userId: number, updatedUser: User): Promise<AxiosResponse<User>> {
        return axios.put<User>(API + `/update-user/${userId}`, updatedUser);
    },

    async checkMDP(login: {"identifiant": string, "motDePasseHash": string}) {
        console.log("x : ", login);
        return axios.post<{}>(API + '/checkMDP', login);
    }
  };
  
  export default UserService;