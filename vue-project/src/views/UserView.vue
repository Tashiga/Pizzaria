<script lang="ts">
    import { ref, onMounted, type Ref } from 'vue';
    import UserService from '@/api/userService';
    import {type User} from '@/model/user';

    export default {
        setup() {

            //vars
            const users: Ref<User[]|undefined> = ref();
            let titleIsCreation: Ref<Boolean> = ref(false);
            const userCol: Ref<String[]> = ref(['id', 'username', 'age', 'salaryPerMonth', 'workHours']);

            const filterText = ref('');

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
            const workHoursAdd: Ref<number> = ref(0);

            onMounted(() => {
                console.log('On essaye de récupérer les users');
                fetchUsers();
                console.log('récupération vaut : ', users);
            });
            

            //functions
            async function fetchUsers() {
                try {
                    console.log('try to get user [front]');
                    const response = await UserService.getUsers().then(response => {
                        users.value = Object.values(response.data);
                        filteredUsers();
                    });
                    console.log('get : ', users.value);
                } catch (error) {
                    console.error(error); 
                }
            }

            async function addUser(username: User) {
                try {
                    const response = await UserService.addUser(username);
                } catch (error) {
                    console.error(error);
                }
            }

            async function deleteUser(userId: number) {
                try {
                    const response = await UserService.deleteUserbyId(userId);
                } catch (error) {
                    console.error(error);
                }
                finally{
                    fetchUsers();
                }

            }

            async function updateUser(user: User){
                try {
                    if(user.age && user.age<=0) 
                        throw new Error('Age ne peut être négatif ou null.');
                    else if(user.salaryPerMonth && user.salaryPerMonth<0)
                        throw new Error('SalaryPerMonth ne peut être négatif.');
                    else if(user.workHours && user.workHours<0)
                        throw new Error('WorkHours ne peut être négatif.');
                    const response = await UserService.updateUser(user.id, user);
                    showModal.value = false;
                } catch (error) {
                    console.error(error);
                }
                finally{
                    fetchUsers();
                }
            }

            // function getSrcOfPhoto(photo: string) : string {
            //     return '@/assets/' + photo;
            // }

            function createNewMember(name: string, age?: number, salaryPerMonth?: number, workHours?: number) {
                const user: User = {
                    id: 0,//par default je mets 0 comme id pour ceux qui n'ont pas
                    username: name,
                    age: age,
                    salaryPerMonth: salaryPerMonth,
                    workHours : workHours
                };
                addUser(user);
            }

            function getUsers(): User[] {
                let v : User[][] = users.value;
                return v[0];
            }
            
            let showModal: Ref<Boolean> = ref(false);
            let userToUpdate: Ref<User> = ref({"id": 0, "username" : '', "age": 0, "salaryPerMonth": 0, "workHours": 0});

            function toggleButtonModal (user: User)  {
                showModal.value = !showModal.value;
                userToUpdate.value = {
                    id: user.id,
                    username: user.username,
                    age: user.age,
                    salaryPerMonth: user.salaryPerMonth,
                    workHours: user.workHours
                };
            };


            function closeModal() {
                showModal.value = false;
            }

            const filteredUsers = () => {
                if(filterText.value !== '') 
                    return getUsers().filter(user =>
                        user.username.toLowerCase().includes(filterText.value.toLowerCase())
                    );
                else
                    return getUsers();
            };

            function updateFilter(event: InputEvent| any) {
                filterText.value = (event.target as HTMLInputElement).value;
                filteredUsers();
            }

            return {users, titleIsCreation, userCol,
                nameToAdd, ageToAdd, salaryToAdd, workHoursAdd,
                deleteUser, createNewMember, getUsers, updateUser,
                toggleButton, 
                closeModal, showModal, toggleButtonModal, userToUpdate,
                filterText, filteredUsers, updateFilter
            };
        },
    };
    
</script>

<template>
    <main>
        <div>
            <div>
                <div v-if="titleIsCreation">
                    <h2 class="title">Create new user</h2>
                    <img  alt="Return Back" class="icon delete moveToRight" src="@/assets/return-back.svg" width="20" @click="toggleButton()" title="Display all users"/>
                </div>
                <div v-else>
                    <h2 class="title">Display all users</h2>
                    <img alt="Create user" class="icon delete moveToRight" src="@/assets/add.svg" width="20" @click="toggleButton()" title="Create new user"/> 
                </div>
                
                
            </div>

            
            <div>
                <div v-if="titleIsCreation">
                        <input type="text" placeholder="name" v-model="nameToAdd"/><br>
                        <input type="text" placeholder="age" v-model="ageToAdd"/><br>
                        <input type="text" placeholder="Salary per month" v-model="salaryToAdd"/><br>
                        <input type="text" placeholder="work hours" v-model="workHoursAdd"/><br>
                        <button @click="createNewMember(nameToAdd, ageToAdd, salaryToAdd,workHoursAdd)">Créer</button><br>
                </div>
                <div v-else>
                    <span>Filter By Username : </span>
                    <input type="text" v-model="filterText" class="filter" @input="updateFilter" placeholder="Rechercher par nom d'utilisateur" />

                    <!-- Modale -->
                    <div class="modal" v-if="showModal">
                        <div class="modal-content">
                            <h2>Détails de l'utilisateur</h2>
                            <div v-if="userToUpdate">
                                <input type="text" placeholder="UserName" v-model="userToUpdate.username"/>
                                <input type="text" placeholder="Age" v-model="userToUpdate.age"/>
                                <input type="text" placeholder="SalaryPerMonth" v-model="userToUpdate.salaryPerMonth"/>
                                <input type="text" placeholder="WorkHours" v-model="userToUpdate.workHours"/>
                                <button @click="updateUser(userToUpdate)">Update</button>
                            </div>
                        
                            <!-- Bouton pour fermer la modale -->
                            <button @click="closeModal">Fermer</button>
                        </div>
                    </div>

                    <table class="custom-table" v-if="users">   
                        <thead>
                            <tr>
                                <th v-for="(col, i) in userCol" :key="i">{{ col }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="u in filteredUsers()" :key="u.id">
                                <td v-for="(col, i) in u" :key="i">
                                    {{ col }}
                                </td>
                                <img alt="Update user" class="icon delete" src="@/assets/modify.svg" width="20" @click="toggleButtonModal(u)"/> 
                                <img alt="Delete user" class="icon delete" src="@/assets/delete.svg" width="20" @click="deleteUser(u.id)"/> 
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
    border: 3px solid brown;
}

.title{
    text-align: center;
}

.filter{
    width: 300px;
}

.filter ::placeholder{
    text-align: center;
}

.delete{
    margin-top: 10px;
    cursor: pointer;
}


.custom-table {
    border-collapse: collapse;
    width: 100%;
}

.custom-table th {
    background-color: #777877; 
    padding: 7px;
    color: white;
    border: 1px solid #ddd;
}

.custom-table td {
    border: 1px solid #ddd; 
    padding: 8px;
}

/* Styles pour la modale */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Fond semi-transparent pour assombrir le contenu derrière */
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  color: black;
}

.moveToRight{
    float: right;
}

</style>