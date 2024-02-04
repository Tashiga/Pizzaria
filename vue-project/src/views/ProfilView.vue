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
    import { useI18n } from 'vue-i18n';

    const store = useStore();
    let userLogin: Ref<ProfilUser> |  Ref<null> = ref(null);
    const router = useRouter();
    let isAnAdmin : Ref<boolean> = ref(false);
    const { t } = useI18n();

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
      toastr.success(t('You have been disconnected !'));
      router.push('/connexion');
    };




</script>

<template>
  <div class="profil">
    <h1>{{ $t('Profile') }}</h1>
    <div v-if="userLogin">
      <span>{{ $t('Your') }} {{ $t('Name') }} : {{ userLogin.nom }}</span> <br />
      <span>{{ $t('Your') }} {{ $t('First name') }} : {{ userLogin.prenom }}</span> <br />
      <span>{{ $t('Your') }} {{ $t('Age') }} : {{ userLogin.age }}</span> <br />

      <div v-if="isAnAdmin"> 
        <span>{{ $t('Your') }} {{ $t('mail address') }} : {{ userLogin.adresseMail }}</span>
      </div>

      <div v-else>
        <span>{{ $t('Your') }} {{ $t('salary') }} : {{ userLogin.salaryPerMonth }} euros</span> <br />
        <span>{{ $t('Your') }} {{ $t('work time') }} : {{ userLogin.workHours }}</span><br />
      </div>
      
      <button @click="logout">{{ $t('Sign out') }}</button>
    </div>
    <div v-else>
      <p>{{ $t('No users found') }}</p>
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
  