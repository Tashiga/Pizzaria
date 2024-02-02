<script setup lang="ts">
    import { ref, type Ref , onMounted} from 'vue';
    import UserService from '@/api/userService';
    import toastr from 'toastr';
    import 'toastr/build/toastr.min.css';
    import { User } from '@/model/user';
    import { useRouter} from 'vue-router';
    import { computed } from 'vue';
    import { useStore } from 'vuex';  
import type { ProfilUser } from '@/model/profilUser';

    const store = useStore();
    let userLogin: Ref<ProfilUser> |  Ref<null> = ref(null);
      const router = useRouter();
      let isAnAdmin : Ref<boolean> = ref(false);

    onMounted(async () => {
      const user = computed(() => store.getters.getUser);
      const isAdmin = computed (() => store.getters.isAdmin);
      // store.getters.getUser;
      
      if(user && user.value){
        userLogin.value = user.value;
        if(isAdmin && isAdmin.value)
        isAnAdmin.value = true;
        console.log('Bienvenue dans votre profil !');
      }
      else {
        console.log('Aucun utilisateur trouvé.');
        router.push('/connexion');
      }

    });

    const logout = () => {
      // Appeler l'action de déconnexion
      store.dispatch('logoutUser');
      toastr.success('Vous avez bien été déconnecté !');
      router.push('/connexion');
    };




</script>

<template>
  <div class="profil">
    <h1>Profil</h1>
    <div v-if="userLogin">
      <span>Votre nom : {{ userLogin.nom }}</span> <br />
      <span>Votre prénom : {{ userLogin.prenom }}</span> <br />
      <span>Votre age : {{ userLogin.age }}</span> <br />

      <div v-if="isAnAdmin"> 
        <span>Votre adresse mail : {{ userLogin.adresseMail }}</span>
      </div>

      <div v-else>
        <span>Votre salaire : {{ userLogin.salaryPerMonth }} euros</span> <br />
        <span>Votre temps de travail : {{ userLogin.workHours }}</span><br />
      </div>
      
      <button @click="logout">Déconnexion</button>
    </div>
    <div v-else>
      <p>Aucun utilisateur trouvé.</p>
      <!-- Vous pouvez également rediriger l'utilisateur vers une page de connexion ici -->
    </div>
  </div>
</template>
  
  <style>
  @media (min-width: 1024px) {
    .about {
      align-items: center;
    }
  }
  </style>
  