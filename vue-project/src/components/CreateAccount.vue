<script setup lang="ts">
    import { ref, type Ref , onMounted, getCurrentInstance} from 'vue';
    import { useI18n } from 'vue-i18n'; 
    import {Staff} from '@/model/staff';
    import {Role, User} from '@/model/user';
    import UserService from '@/api/userService';
    import staffService from '@/api/staffService';
    import {Admin} from '@/model/admin';
    import toastr from 'toastr';

    const { t } = useI18n();
    const TYPE :Role[] = [Role.Admin, Role.Staff, Role.Client];
    const NAV : Ref<string> = ref('Staff');
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
   
    onMounted(async () => {

    });

    function createAccount() {
        console.log('user : ', USER);
        if(NAV.value==='Admin')
            console.log('numTel : ', NUMTEL);
        if(NAV.value==='Client'){
            console.log('addresse : ', ADRESSE);
            console.log('numTel : ', NUMTEL);
            console.log('bankCard : ', BANKCARD);
        }
        toastr.warning('try to create account !');
    }

    function handleNavChange(event: Event) {
      const target = event.target as HTMLSelectElement;
      const value = target.value;
      NAV.value = value;
      console.log("changed : ", NAV.value);
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