<script setup lang="ts">
    import { ref, type Ref , onMounted} from 'vue';
    import UserService from '@/api/userService';
    import toastr from 'toastr';
    import 'toastr/build/toastr.min.css';
    import { Role, User } from '@/model/user';
    import { useRouter} from 'vue-router';
    import { useStore } from 'vuex';
    import { computed } from 'vue';
    import { ProfilUser } from '@/model/profilUser';
    import { useI18n } from 'vue-i18n';

    const login: {'identifiant': string, 'motDePasseHash': string} = {
    "identifiant" : "",
    "motDePasseHash" : ""
};
    const newUser : {'identifiant': string, 'motDePasseHash' : string, 'email' : string} = {
        "identifiant" : "",
        "motDePasseHash" : "",
        "email" : ""
    }
    const store = useStore();
    const router = useRouter();
    const { t } = useI18n();
    const connection : Ref<Boolean> = ref(false);
    onMounted(async () => {
        const user = computed(() => store.getters.getUser);
        if(user && user.value){
            router.push('/profil');
        }
    });

    async function toLogIn() {
        if((login !== undefined && login !== null) && login.identifiant !== null && login.motDePasseHash !== null) {
            try {
                console.log('check : ', login);
                const response = await UserService.checkMDP(login).then(response => {
                    if(response.data && Object.keys(response.data).length > 0) {
                        let data : any = response.data;
                        if(Object.keys(data.result).length > 0) {
                            console.log("data: ", data);
                            let user: any = data.result;
                            toastr.success(t('Connection established'));
                            let test: ProfilUser = new ProfilUser(
                                user.id,
                                user.nom,
                                user.prenom,
                                user.age,
                                user.role
                            );
                            test.isAccount(user.mail, user.identifiant, user.motDePasseHash);
                            if(user.role === Role.Admin)
                                test.isAdmin(user.numTel);
                            else if(user.role === Role.Client)
                                test.isClient(user.adresse, user.numTel, user.bankCard);
                            else if(user.role === Role.Staff)
                                test.isStaff(user.salaryPerMonth, user.workHours);
                            console.log('Contenu du store :', store);
                            try {
                                // Stocker les données de l'utilisateur dans le store Vuex
                                store.dispatch('loginUser', test);
                            }
                            catch(errory){
                                console.log("failed : ",store)
                            }
                            router.push('/profil');
                        }
                        else 
                            toastr.error(t('Username/Password does not match.') + '\n' + t('Please try again'));
                    }
                });
            } catch (error) {
                console.error(error);
                toastr.error(t('Problem connecting'))
            }
        }
        
    }

    async function createUser() {
        if(newUser !== undefined && newUser !== null && newUser.identifiant !== null && newUser.motDePasseHash !== null && newUser.email !== null) {
            console.log("need to code inscription for ...", newUser);
        }
    }

    function changeOtpion() {
        connection.value = !connection.value;
    }
    


</script>

<template>
    <main>

        <div class="connexionContent" v-if="!connection">
            <div class="form">
                <h2>{{ $t('Connection') }}</h2>
                <input type="text" class="connexionInputs" name="identifiant" :placeholder="$t('Username')" v-model="login.identifiant" required>
                <input type="password" class="connexionInputs" name="password" :placeholder="$t('Password')" v-model="login.motDePasseHash" required>
                <button class="connexionInputs connexionButton" @click="toLogIn()">{{ $t('To log in') }}</button>
                <span @click="changeOtpion()">{{ $t('Inscription') }}</span>
                <!-- <input type="submit" value="Se connecter"> -->
            </div>
            
        </div>

        <div v-else class="connexionContent">
            <div class="form">
                <h2>{{ $t('Inscription') }}</h2>
                <input type="text" class="connexionInputs" name="identifiant" :placeholder="$t('Username')" v-model="newUser.identifiant" required>
                <input type="password" class="connexionInputs" name="password" :placeholder="$t('Password')" v-model="newUser.motDePasseHash" required>
                <input type="email" class="connexionInputs" name="email" :placeholder="$t('Email')" v-model="newUser.email" required>
                <button class="connexionInputs connexionButton" @click="createUser()">{{ $t('Sign up') }}</button>
                <span @click="changeOtpion()">{{ $t('Connection') }}</span>
                <!-- <input type="submit" value="Se connecter"> -->
            </div>
        </div>

        
    </main>
</template>

<style>

.connexionContent {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}
.form {
    color: hsla(160, 100%, 37%, 1);
    text-align: center;
    background-color: #252222d7;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.connexionButton{
    background-color: rgb(3, 133, 90);
    color: #fff;
    cursor: pointer;
}

.connexionButton:hover {
    background-color: rgb(18, 97, 71);
}

.connexionInputs{
    width: 100%;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 3px;
    box-sizing: border-box;
}

/* input[type="text"],
input[type="password"],
input[type="submit"] {
    
}
input[type="submit"] {
    background-color: rgb(3, 133, 90);
    color: #fff;
    cursor: pointer;
}
input[type="submit"]:hover {
    background-color: rgb(18, 97, 71);
} */


</style>