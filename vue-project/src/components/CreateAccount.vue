<script setup lang="ts">
    import { ref, type Ref , onMounted, getCurrentInstance} from 'vue';
    import { useI18n } from 'vue-i18n'; 
    import {Staff} from '@/model/staff';
    import {Role, User} from '@/model/user';
    import UserService from '@/api/userService';
    import staffService from '@/api/staffService';
    import adminService from '@/api/adminService';
    import clientService from '@/api/clientService';
    import {Admin} from '@/model/admin';
    import {Client} from '@/model/client';
    import toastr from 'toastr';
import { ProfilUser } from '@/model/profilUser';

    const { t } = useI18n();
    const TYPE :Role[] = [Role.Admin, Role.Staff, Role.Client];
    const NAV : Ref<Role> = ref(Role.Staff);
    const USER: User = 
    {
        id: 0,
        nom: '', 
        prenom : '',
        age : 18,
        role : Role.Staff,
        mail : '',
        identifiant: '',
        motDePasseHash : ''
    };
    const NUMTEL: Ref<string> = ref('');
    const ADRESSE: Ref<string> = ref('');
    const BANKCARD: Ref<string> = ref('');
    const SALARY: Ref<number|null> = ref(null);
    const WORKHOURS: Ref<number|null> = ref(null);
   
    onMounted(async () => {

    });

    function createAccount() {
        // console.log('user : ', USER);
        const profilUser = new ProfilUser(USER.id, USER.nom, USER.prenom, USER.age, NAV.value);
        if(USER.mail && USER.identifiant && USER.motDePasseHash){
            profilUser.isAccount(USER.mail, USER.identifiant, USER.motDePasseHash);
            if(NAV.value==='Admin'){
                // console.log('numTel : ', NUMTEL);
                profilUser.isAdmin(parseInt(NUMTEL.value));
            }
            else if(NAV.value==='Client'){
                // console.log('addresse : ', ADRESSE);
                // console.log('numTel : ', NUMTEL);
                // console.log('bankCard : ', BANKCARD);
                profilUser.isClient(ADRESSE.value, parseInt(NUMTEL.value), parseInt(BANKCARD.value));
            }
            else if(NAV.value === 'Staff' && SALARY.value != null && WORKHOURS.value != null){
                // console.log('salaire : ', SALARY);
                // console.log('work hours : ', WORKHOURS);
                profilUser.isStaff(SALARY.value, WORKHOURS.value);
            }
            addAccount(profilUser);
            console.log('profil user : ', profilUser)
            toastr.warning('try to create account !');
        }
        
    }

    /*
    * Créer d'abord l'User ensuite créer soit Staff, Admin ou Client en fonction du role
    */
    async function addAccount(profilUser: ProfilUser) {
        try {
            const user = new User(profilUser.id, profilUser.nom, profilUser.prenom, profilUser.age, profilUser.role, profilUser.mail, profilUser.identifiant, profilUser.motDePasseHash);
            const response1 = await UserService.addUser(user);
            console.log("user created : ", user);
            console.log('response : ', response1);
            profilUser.id = response1.data.id;
            if(profilUser.role === Role.Staff && profilUser.salaryPerMonth && profilUser.workHours){
                const staff = new Staff(profilUser.id, profilUser.nom, profilUser.prenom, profilUser.age, profilUser.role, profilUser.salaryPerMonth, profilUser.workHours);
                const response = await staffService.addStaff(staff);
            }
            else if(profilUser.role === Role.Admin && profilUser.mail && profilUser.identifiant && profilUser.motDePasseHash && profilUser.numTel) {
                const admin = new Admin(profilUser.id, profilUser.nom, profilUser.prenom, profilUser.age, profilUser.role, profilUser.mail, profilUser.identifiant, profilUser.motDePasseHash, profilUser.numTel);
                const responseAdmin = await adminService.addAdmin(admin);
            }
            else if(profilUser.role === Role.Client && profilUser.mail && profilUser.identifiant && profilUser.motDePasseHash && profilUser.adresse){
                const client = new Client(profilUser.id, profilUser.nom, profilUser.prenom, profilUser.age, profilUser.role, profilUser.mail, profilUser.identifiant, profilUser.motDePasseHash, profilUser.adresse, profilUser.numTel, profilUser.bankCard);
                const responseClient = await clientService.addClient(client);
            }
            // toggleButton();
            toastr.success('User ' + t('created'));
        } catch (error) {
            console.error(error);
            toastr.error(t('Something bad happened'));
        }
    }

    function handleNavChange(event: Event) {
      const target = event.target as HTMLSelectElement;
      const value = target.value;
      NAV.value = getRole(value);
      console.log("changed : ", NAV.value);
    }

    function getRole(value: string): Role{
        if(value==="Admin")
            return Role.Admin;
        else if(value==="Client")
            return Role.Client;
        else 
            return Role.Staff;
    }


</script>

<template>
    <div class="content">
        <h1 class="title">{{ $t('Create an account')}}</h1>
        <form @submit.prevent="createAccount()">
            <span>{{ $t('Type of account')}} : </span>
            <select v-model="NAV" @change="handleNavChange">
                <option v-for="(type, index) in TYPE"  :key="index" class="nav" :value="type">{{ type }}</option >
            </select>
            <br/>
            <br/>
            <span>{{ $t('Name')}} : (*) </span>
            <input type="text" v-model="USER.nom" required/><br/>
            <span>{{ $t('First name')}} : (*) </span>
            <input type="text" v-model="USER.prenom" required/><br/>
            <span>{{ $t('Age')}} : (*) </span>
            <input type="number" v-model="USER.age" max="80" required/><br/> <!-- max age : 80 -->
            <div v-if="NAV=='Admin'">
                <span> {{ $t('phone number') }} : (*) </span>
                <input type="tel" pattern="[0-9]{2}\.[0-9]{2}\.[0-9]{2}\.[0-9]{2}\.[0-9]{2}" placeholder="01.23.45.67.89" v-model="NUMTEL" size="13" required />
                <br/>
            </div>
            <div v-if="NAV=='Staff'">
                <span> {{ $t('salary') }} : (*)</span>
                <input type="number" v-model="SALARY" required/><br/>
                <span> {{ $t('work time') }} : (*)</span>
                <input type="number" v-model="WORKHOURS" required/> <br/>
            </div>
            <div v-if="NAV=='Client'">
                <span> {{ $t('address') }} : (*) </span>
                <input type="text" v-model="ADRESSE" required/><br/>
                <span> {{ $t('phone number') }} : </span>
                <input type="tel" pattern="[0-9]{2}.[0-9]{2}.[0-9]{2}.[0-9]{2}.[0-9]{2}" placeholder="01.23.45.67.89" v-model="NUMTEL" />
                <br/>
                <span>{{ $t('Bank card') }} : </span>
                <input type="text" v-model="BANKCARD" />
            </div>
            <br/>
            <span>{{ $t('mail address')}} : (*) </span>
            <input type="email" v-model="USER.mail" required/><br/>
            <span>{{ $t('Username')}} : (*) </span>
            <input type="text" v-model="USER.identifiant" required/><br/>
            <span>{{ $t('Password')}} : (*) </span>
            <input type="password" v-model="USER.motDePasseHash" required/><br/><br/>
            <button type="submit">{{ $t('Create an account')}}</button>

            <br/><br/><span>(*) : {{  $t('required fields') }}</span>
        </form>
    

    
    </div>
</template>

<style>

h3:hover{
    font-size: large;
    color: red;
}
</style>