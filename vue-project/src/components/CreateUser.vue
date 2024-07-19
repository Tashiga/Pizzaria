<script setup lang="ts">
    import { ref, type Ref , onMounted, getCurrentInstance} from 'vue';
    import { useI18n } from 'vue-i18n'; 
    import {Staff} from '@/model/staff';
    import {Role, User} from '@/model/user';
    import UserService from '@/api/userService';
    import staffService from '@/api/staffService';
    import toastr from 'toastr';

    defineProps<{
        titleToDisplay: string
    }>()

    const { t } = useI18n();
    //for create new user
    const nameToAdd: Ref<string> = ref('');
    const prenomToAdd: Ref<string>  = ref('');
    const ageToAdd: Ref<number|null> = ref(null);
    const salaryToAdd: Ref<number|null> = ref(null);
    const workHoursAdd: Ref<number|null> = ref(null);

    onMounted(async () => {

    });

    function createNewMember(nom: string, prenom: string, age: number | null, salaryPerMonth: number| null, workHours: number| null) {
        if((age === null || age == 0) || (salaryPerMonth === null || salaryPerMonth == 0) || (workHours  === null || workHours == 0))
            toastr.warning(t('Please enter all fields'));
        else {
            const user: Staff = new Staff(0, nom, prenom, age, Role.Staff, salaryPerMonth, workHours);
            addUser(user);
            nameToAdd.value = "";
            prenomToAdd.value = "";
            ageToAdd.value = null;
            salaryToAdd.value =  null;
            workHoursAdd.value =  null;
        }
        

    }

    async function addUser(staff: Staff) {
        try {
            const user = new User(staff.id, staff.nom, staff.prenom, staff.age, Role.Staff, staff.identifiant, staff.motDePasseHash);
            const response1 = await UserService.addUser(user);
            console.log("user created : ", user);
            console.log('response : ', response1);
            staff.id = response1.data.id;
            const response = await staffService.addStaff(staff);
            // toggleButton();
            toastr.success('User ' + t('created'));
        } catch (error) {
            console.error(error);
            toastr.error(t('Something bad happened'));
        }
    }


</script>

<template>
    <div class="content">
        <h1 v-if="titleToDisplay=='true'" class="title">{{ $t('Create new-m')}} User</h1>
        <!-- create new Staff -->
        <div>
            <div class="labels">
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
            </div>
        </div>
    </div>
</template>

<style>
</style>