<script lang="ts">
    import { ref, onMounted, type Ref } from 'vue';
    import UserService from '@/api/userService';
    import staffService from '@/api/staffService';
    import {Staff} from '@/model/staff';
    import {Role, User} from '@/model/user';
    import toastr from 'toastr';
    import 'toastr/build/toastr.min.css';
    import { computed } from 'vue';
    import { useStore } from 'vuex'; 
    import { useI18n } from 'vue-i18n'; 
    import CreateUser from '@/components/CreateUser.vue';

    export default {
    setup() {
        //vars
        const staffs: Ref<Staff[] | undefined> = ref();
        let titleIsCreation: Ref<Boolean> = ref(false);
        const userCol: Ref<String[]> = ref(['id', 'nom', 'prenom', 'age', 'salaryPerMonth', 'workHours']);
        const filterText = ref('');
        const toggleButton = () => {
            titleIsCreation.value = !titleIsCreation.value;
            if (!titleIsCreation.value) {
                fetchUsers();
            }
        };
        //for create new user
        const nameToAdd: Ref<string> = ref('');
        const prenomToAdd: Ref<string> = ref('');
        const ageToAdd: Ref<number | null> = ref(null);
        const salaryToAdd: Ref<number | null> = ref(null);
        const workHoursAdd: Ref<number | null> = ref(null);
        const store = useStore();
        let isConnected: Ref<boolean> = ref(false);
        let isAnAdmin: Ref<boolean> = ref(false);
        const { t } = useI18n();
        onMounted(() => {
            console.log('On essaye de récupérer les users');
            fetchUsers();
            console.log('récupération vaut : ', staffs);
            const loger = computed(() => store.getters.isLoggedIn);
            const role = computed(() => store.getters.getRole);
            if (loger && loger.value) {
                isConnected.value = true;
                if (role && role.value && role.value == Role.Admin)
                    isAnAdmin.value = true;
            }
        });
        //functions
        async function fetchUsers() {
            try {
                console.log('try to get user [front]');
                const response = await staffService.getStaffs().then(response => {
                    staffs.value = Object.values(response.data);
                    filteredUsers();
                });
                console.log('get : ', staffs.value);
            }
            catch (error) {
                console.error(error);
                toastr.error(t('Something bad happened'));
            }
        }
        async function addUser(staff: Staff) {
            try {
                const user = new User(staff.id, staff.nom, staff.prenom, staff.age, staff.role, staff.mail, staff.identifiant, staff.motDePasseHash);
                const response1 = await UserService.addUser(user);
                console.log("user created : ", user);
                console.log('response : ', response1);
                staff.id = response1.data.id;
                const response = await staffService.addStaff(staff);
                toggleButton();
                toastr.success('User ' + t('created'));
            }
            catch (error) {
                console.error(error);
                toastr.error(t('Something bad happened'));
            }
        }
        async function deleteUser(userId: number) {
            try {
                const response = await staffService.deleteStaffbyId(userId);
                const response2 = await UserService.deleteUserbyId(userId);
                toastr.success('User ' + t('deleted'));
            }
            catch (error) {
                console.error(error);
                toastr.error(t('Something bad happened'));
            }
            finally {
                fetchUsers();
            }
        }
        async function updateUser(staff: Staff) {
            try {
                if (staff.age && staff.age <= 0)
                    throw new Error('Age ' + t('cannot be negative'));
                else if (staff.salaryPerMonth && staff.salaryPerMonth < 0)
                    throw new Error('SalaryPerMonth ' + t('cannot be negative'));
                else if (staff.workHours && staff.workHours < 0)
                    throw new Error('WorkHours ' + t('cannot be negative'));
                const response = await staffService.updateStaff(staff.id, staff);
                const user: User = new User(staff.id, staff.nom, staff.prenom, staff.age, staff.role, staff.mail, staff.identifiant, staff.motDePasseHash);
                const response2 = await UserService.updateUser(user.id, user);
                showModal.value = false;
                toastr.success('User ' + t('updated'));
            }
            catch (error) {
                console.error(error);
                toastr.error(t('Something bad happened'));
            }
            finally {
                fetchUsers();
            }
        }
        // // function getSrcOfPhoto(photo: string) : string {
        // //     return '@/assets/' + photo;
        // // }
        function createNewMember(nom: string, prenom: string, age: number | null, salaryPerMonth: number | null, workHours: number | null) {
            if (age === null)
                age = 0;
            if (salaryPerMonth === null)
                salaryPerMonth = 0;
            if (workHours === null)
                workHours = 0;
            const user: Staff = new Staff(0, nom, prenom, age, Role.Staff, salaryPerMonth, workHours);
            addUser(user);
        }
        function getUsers(): Staff[] {
            let v: Staff[][] | any = staffs.value;
            return v[0];
        }
        // modal
        let showModal: Ref<Boolean> = ref(false);
        let userToUpdate: Ref<Staff> = ref(new Staff(0, '', '', 0, Role.Staff, 0, 0));
        function toggleButtonModal(user: Staff) {
            showModal.value = !showModal.value;
            userToUpdate.value = new Staff(user.id, user.nom, user.prenom, user.age, Role.Staff, user.salaryPerMonth, user.workHours);
        }
        ;
        function closeModal() {
            showModal.value = false;
        }
        const filteredUsers = () => {
            if (filterText.value !== '')
                return getUsers().filter(user => user.nom.toLowerCase().includes(filterText.value.toLowerCase()) || user.prenom.toLowerCase().includes(filterText.value.toLocaleLowerCase()));
            else
                return getUsers();
        };
        function updateFilter(event: InputEvent | any) {
            filterText.value = (event.target as HTMLInputElement).value;
            filteredUsers();
        }
        return { staffs,
            titleIsCreation, userCol,
            nameToAdd, prenomToAdd, ageToAdd, salaryToAdd, workHoursAdd,
            deleteUser, createNewMember, getUsers, updateUser, toggleButton,
            closeModal, showModal, toggleButtonModal, userToUpdate,
            filterText, filteredUsers, updateFilter, isConnected, isAnAdmin,
            Role
        };
    },
    components: { CreateUser }
};
    
</script>

<template>
    <!-- <main> -->
        <!-- <div> -->
            <div v-if="isConnected && isAnAdmin" class="content">
                <div v-if="titleIsCreation">
                    <h1 class="title">{{ $t('Create new-m')}} User</h1>
                    <img  alt="Return Back" class="icon delete moveToRight" src="@/assets/return-back.svg" width="20" @click="toggleButton()" :title="$t('Display all-m') +' users'"/>
                </div>
                <div v-else>
                    <h1 class="title">{{ $t('Display all-m')}} Users</h1>
                    <img alt="Create user" class="icon delete moveToRight" src="@/assets/add.svg" width="20" @click="toggleButton()" :title="$t('Create new-m')+' user'"/> 
                </div>
            </div>

            
            <div class="content">
                <!-- create new Staff -->
                <div v-if="titleIsCreation">
                    <!-- <div class="labels">
                        <label>{{ $t('Name')}} : </label>
                        <input type="text" v-model="nameToAdd"/>
                    </div>
                    <div class="labels">
                        <label>{{ $t('First name')}} : </label>
                        <input type="text" v-model="prenomToAdd"/>
                    </div>
                    <div class="labels">
                        <label>{{ $t('Age')}} : </label>
                        <input type="text" v-model="ageToAdd"/>
                    </div>
                    <div class="labels">
                        <label>{{ $t('Salary per month')}} : </label>
                        <input type="text" v-model="salaryToAdd"/>
                    </div>
                    <div class="labels">
                        <label>{{ $t('Working hours')}} : </label>
                        <input type="text" v-model="workHoursAdd"/>
                    </div>
                    <div class="labels">
                        <button @click="createNewMember(nameToAdd, prenomToAdd, ageToAdd, salaryToAdd,workHoursAdd)">{{ $t('Create') }}</button>
                    </div> -->

                    <CreateUser titleToDisplay="false"/>
                    
                </div>

                <div v-else class="content">
                    <span>{{ $t('Search by') }} Username : </span>
                    <input type="text" v-model="filterText" class="filter" @input="updateFilter" />

                    <!-- Modale -->
                    <div class="modal" v-if="showModal">
                        <div class="modal-content">
                            <h2>{{ $t('User details') }}</h2>
                            <div v-if="userToUpdate">
                                <input type="text" v-model="userToUpdate.nom"/>
                                <input type="text" v-model="userToUpdate.prenom"/>
                                <input type="text" v-model="userToUpdate.age"/>
                                <input type="text" v-model="userToUpdate.salaryPerMonth"/>
                                <input type="text" v-model="userToUpdate.workHours"/>
                                <button @click="updateUser(userToUpdate)">{{ $t('Update') }}</button>
                            </div>
                            <button @click="closeModal">{{ $t('close') }}</button>
                        </div>
                    </div>

                    <!-- Display all Staff -->
                    <table class="custom-table" v-if="staffs">   
                        <thead>
                            <tr>
                                <th v-for="(col, i) in userCol" :key="i">{{ col }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="u in filteredUsers()" :key="u.id">
                                <td>{{ u.id }}</td>
                                <td>{{ u.nom }}</td>
                                <td>{{ u.prenom }}</td>
                                <td>{{ u.age }}</td>
                                <td>{{ u.salaryPerMonth }}</td>
                                <td>{{ u.workHours }}</td>
                                <!-- <td v-for="(col, i) in u" :key="i" >
                                    <template v-if="col !== 'Staff'">
                                        {{ col }}
                                    </template>
                                </td> -->
                                <img v-if="isConnected && isAnAdmin" alt="Update user" class="delete" src="@/assets/modify.svg" width="20" @click="toggleButtonModal(u)"/> 
                                <img v-if="isConnected && isAnAdmin" alt="Delete user" class="delete" src="@/assets/delete.svg" width="20" @click="deleteUser(u.id)"/> 
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        <!-- </div> -->
    <!-- </main> -->
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

.labels{
    display: inline-block;
    margin: 10px;
}
</style>