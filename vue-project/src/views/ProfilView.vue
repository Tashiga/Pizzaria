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
    import AdminActions from '../components/AdminActions.vue';

    const store = useStore();
    let userLogin: Ref<ProfilUser> |  Ref<null> = ref(null);
    const router = useRouter();
    let isAnAdmin : Ref<boolean> = ref(false);
    const { t } = useI18n();
    const menu :  Ref<string[]>= ref([]);
    const currentNav: Ref<string> = ref(t('Profil'));

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

      if(isAdmin.value){
        menu.value = [t('Profil'), t('Dashboard')];
      }
      else {
        menu.value = [t('Profil')];
      }

    });

    const logout = () => {
      // Appeler l'action de déconnexion
      store.dispatch('logoutUser');
      toastr.success(t('You have been disconnected !'));
      router.push('/connexion');
    };

    function setNav(nav: string){
      currentNav.value = nav;
    }




</script>

<template>

<ul class="navigation" >
  <li v-for="page in menu" @click="setNav(page)">{{ page }}</li>
</ul>
<hr style="width: 100%;">

  <div class="profil" v-if="currentNav === 'Profil'">
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

    <AdminActions v-if="isAnAdmin && currentNav === 'Dashboard'"/>
</template>
  
  <style>
  @media (min-width: 1024px) {
    .about {
      align-items: center;
    }
  }

  /* Styles de la liste */
.navigation {
  list-style: none;
  padding: 2px;
  margin: 0;
}

/* Style des éléments de la liste */
.navigation li {
  display: inline-block; /* Afficher les éléments de liste en ligne */
  /* margin-right: 20px; Espacement entre les éléments de liste */
  border: 1px solid white;
  
  padding-left: 10px;
  padding-right: 10px;
  /* border-right: 1px solid white;
  border-top: 1px solid white;
  border-left: 1px solid white; */
}
  </style>
  