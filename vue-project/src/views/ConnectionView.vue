<script setup lang="ts">
    import { ref, type Ref , onMounted} from 'vue';
    import UserService from '@/api/userService';
    import toastr from 'toastr';
    import 'toastr/build/toastr.min.css';
import { User } from '@/model/user';

    const login: {'identifiant': string, 'motDePasseHash': string} = {
    "identifiant" : "",
    "motDePasseHash" : ""
};

    onMounted(async () => {
        console.log('On essaye de récupérer les pizzas');
    });

    async function toLogIn() {
        if((login !== undefined && login !== null) && login.identifiant !== null && login.motDePasseHash !== null) {
            try {
                console.log('check : ', login);
                const response = await UserService.checkMDP(login).then(response => {
                    if(response.data && Object.keys(response.data).length > 0 && Object.keys(response.data.result).length > 0){
                        console.log("data: ", response.data);
                        toastr.success('Connexion établie !');
                    }
                    else 
                        toastr.error('Identifiant/Mot de passe ne correspond pas.\nVeuillez ressayer.');
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