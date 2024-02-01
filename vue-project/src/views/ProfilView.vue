<script setup lang="ts">
    import { ref, type Ref , onMounted} from 'vue';
    import UserService from '@/api/userService';
    import toastr from 'toastr';
    import 'toastr/build/toastr.min.css';
    import { User } from '@/model/user';
    import { useRouter} from 'vue-router';
    import { computed } from 'vue';
    import { useStore } from 'vuex';  

    const store = useStore();
    let userLogin: Ref<User> |  Ref<null> = ref(null);
      const router = useRouter();

    onMounted(async () => {
      const user = computed(() => store.getters.getUser);
      // store.getters.getUser;
      
      if(user && user.value){
        userLogin.value = user.value;
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
  