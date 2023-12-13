<script lang="ts">
    import { ref, onMounted, type Ref } from 'vue';
    import UserService from '@/api/userService';
    import {type User} from '@/model/user';

    export default {
        setup() {

            //vars
            const users: Ref<User|undefined> = ref();
            let titleIsCreation: Ref<Boolean> = ref(false);

            const toggleButton = () => {
                titleIsCreation.value = !titleIsCreation.value;
                if(!titleIsCreation.value) {
                    fetchUsers();
                }
            };

            //for create new user
            const nameToAdd: Ref<string> = ref('');
            const ageToAdd: Ref<number> = ref(0);
            const salaryToAdd: Ref<number> = ref(0);
            const photoToAdd: Ref<string> = ref('');
            

            //functions
            async function fetchUsers() {
                try {
                    console.log('try to get user [front]');
                    const response = await UserService.getUsers().then(response => {
                        users.value = response.data;
                    });
                    console.log('get : ', users.value);
                } catch (error) {
                    console.error(error); 
                }
            }

            async function addUser(username: User) {
                try {
                    const response = await UserService.addUser(username);
                    console.log("new user added ! => ", response);
                } catch (error) {
                    console.error(error);
                }
            }

            function getSrcOfPhoto(photo: string) : string {
                return '@/assets/' + photo;
            }

            function createNewMember(name: string, age?: number, salaryPerMonth?: number, photo?: string) {
                const user: User = {
                    id: 0,//par default je mets 0 comme id pour ceux qui n'ont pas
                    username: name
                };
                addUser(user);
                console.log("finished")!
            }


            onMounted(() => {
                console.log('On essaye de récupérer les users');
                fetchUsers();
                console.log('récupération vaut : ', users);
            });

            return { users, titleIsCreation, 
                nameToAdd, ageToAdd, salaryToAdd, photoToAdd,
                toggleButton, getSrcOfPhoto, createNewMember};
        },
    };
    
</script>

<template>
    <main>
        <div>
            <div @click="toggleButton">
                <button v-if="!titleIsCreation">Create new user</button>
                <button v-else>Display all users</button>
            </div>
            <div>
                <div v-if="titleIsCreation">
                    <h1>Membre à ajouter : </h1>
                        <input type="text" placeholder="name" v-model="nameToAdd"/>
                        <input type="text" placeholder="age" v-model="ageToAdd"/>
                        <input type="text" placeholder="Salary per month" v-model="salaryToAdd"/>
                        <input type="text" placeholder="photo" v-model="photoToAdd"/>
                        <button @click="createNewMember(nameToAdd, ageToAdd, salaryToAdd, photoToAdd)">Créer</button>
                </div>
                <div v-else>
                    <table>
                        <thead>
                            <tr>
                                <th colspan="2"><h1>List of our members</h1></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="member in users">
                                <div v-for="(u, index) in member" :key="index">
                                    <td v-if="member!= undefined">{{ u.id }} </td>
                                    <td v-if="member!= undefined">{{ u.username }} </td>
                                </div>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
       
    </main>
</template>

<style>

.case{
    border: 3px solid white;
}

</style>