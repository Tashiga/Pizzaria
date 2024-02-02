<script setup lang="ts">
    import { ref, type Ref , onMounted} from 'vue';
    import UserService from '@/api/userService';
    import toastr from 'toastr';
    import 'toastr/build/toastr.min.css';
    import { User } from '@/model/user';
    import { useRouter} from 'vue-router';
    import { useStore } from 'vuex';
    import { computed } from 'vue';
    import type { ProfilUser } from '@/model/profilUser';

    const login: {'identifiant': string, 'motDePasseHash': string} = {
    "identifiant" : "",
    "motDePasseHash" : ""
};
const store = useStore();
        const router = useRouter();
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
                            toastr.success('Connexion établie !');
                            let test: ProfilUser = {
                                id: user.id,
                                nom: user.nom,
                                prenom: user.prenom,
                                age: user.age,
                                identifiant: user.identifiant,
                                motDePasseHash: user.motDePasseHash,
                                adresseMail: user.adresseMail,
                                salaryPerMonth : user.salaryPerMonth,
                                workHours : user.workHours
                            }
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
                            toastr.error('Identifiant/Mot de passe ne correspond pas.\nVeuillez ressayer.');
                    }
                });
            } catch (error) {
                console.error(error);
                toastr.error('Problème lors de la connexion')
            }
        }
        
    }
    


</script>

<template>
    <main>

        <div class="connexionContent">
            <div class="form">
                <h2>Connexion</h2>
                <input type="text" class="connexionInputs" name="identifiant" placeholder="Nom d'utilisateur" v-model="login.identifiant" required>
                <input type="password" class="connexionInputs" name="password" placeholder="Mot de passe" v-model="login.motDePasseHash" required>
                <button class="connexionInputs connexionButton" @click="toLogIn()">Se Connecter</button>
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