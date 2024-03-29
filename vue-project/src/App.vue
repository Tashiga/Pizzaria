<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue';
import { useStore } from 'vuex';
import {onMounted, ref, type Ref, watchEffect, computed} from 'vue';
import i18n from './config/i18n';

    const store = useStore();
    const isLoggedIn = computed(() => store.getters.isLoggedIn);
    const myImage : any = ref(null);
    const imgSrcProfil = ref('');
    const imgSrcProfilHover = ref('');
    const imgSrcConnexion = ref('');
    const imgSrcConnexionHover = ref('');
    const mySettingsImage : any = ref(null);
    const imgSrcSettingsHover = ref('');
    const imgSrcSettings = ref('');


  onMounted(async () => {
    const language = computed(() => store.getters.getLanguage);
    i18n.global.locale.value = language.value;
    const { default: imgSrcProfilDefault } = await import('@/assets/profil_white.svg');
    const { default: imgSrcProfilHoverDefault } = await import('@/assets/profil_red.svg');
    const { default: imgSrcConnexionDefault } = await import('@/assets/logout.svg');
    const { default: imgSrcConnexionHoverDefault } = await import('@/assets/login.svg');
    const { default: imgSrcSettingsDefault} = await import('@/assets/settings_.svg');
    const { default: imgSrcSettingsHoverDefault} = await import('@/assets/settings_red.svg');
    myImage.value = document.getElementById('myImage');
    mySettingsImage.value = document.getElementById('setting');

    imgSrcProfil.value = imgSrcProfilDefault;
    imgSrcProfilHover.value = imgSrcProfilHoverDefault;
    imgSrcConnexion.value = imgSrcConnexionDefault;
    imgSrcConnexionHover.value = imgSrcConnexionHoverDefault;

    imgSrcSettings.value = imgSrcSettingsDefault;
    imgSrcSettingsHover.value = imgSrcSettingsHoverDefault;

    if (myImage.value) {
      watchEffect(() => {
        if (isLoggedIn.value) {
          myImage.value.src = imgSrcProfil.value;
        } else {
          myImage.value.src = imgSrcConnexion.value;
        }
      });
    } else {
      console.log("Element avec l'ID 'myImage' non trouvé !");
    }
  });

  const handleMouseEnter = () => {
    if (myImage.value) {
      if (isLoggedIn.value) {
        myImage.value.src = imgSrcProfilHover.value;
      } else {
        myImage.value.src = imgSrcConnexionHover.value;
      }
    }
  };

  const handleMouseLeave = () => {
    if (myImage.value) {
      if (isLoggedIn.value) {
        myImage.value.src = imgSrcProfil.value;
      } else {
        myImage.value.src = imgSrcConnexion.value;
      }
    }
  };

  const settingsHandleMouseEnter = () => {
    if (mySettingsImage.value) {
      mySettingsImage.value.src = imgSrcSettingsHover.value;
    }
  };

  const settingsHandleMouseLeave = () => {
    if (mySettingsImage.value) {
      mySettingsImage.value.src = imgSrcSettings.value;
    }
  };

</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/pizza-logo.png" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="CheesyPizza Topia" />

      <nav>
        <RouterLink to="/">{{ $t('home') }}</RouterLink>
        <RouterLink to="/amount">{{ $t('amount') }}</RouterLink>
        <RouterLink to="/pizza">Pizza</RouterLink>
        <RouterLink to="/members">{{ $t('members') }}</RouterLink>
        <RouterLink to="/about">{{ $t('about') }}</RouterLink>
      </nav>
    </div>

    <RouterLink to="/settings" class="notRouter">
      <img id="setting" alt="Settings" class="lock" width="35" height="35" src="@/assets/settings_.svg"
      @mouseenter="settingsHandleMouseEnter"
      @mouseleave="settingsHandleMouseLeave"/>
    </RouterLink>
    
    <RouterLink to="/connexion" class="notRouter">
      <img id="myImage" alt="Connection" class="lock" width="40" height="40"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave" />
    </RouterLink>

    
  </header>

  <RouterView class="body"/>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  /* position: fixed; */
  top: 0;
  left: 150px;
  width: 100%;
  z-index: 999;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 1rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

.body{
  /* margin: 100px; */
  margin-top: 50px;
  width: auto;
  height: auto;
  margin-bottom: 20px;
}

.notRouter {
  background-color: transparent;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
    width: 100%;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  .lock{
    display: inline-block;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;
    margin-top: 1rem;
  }
}
</style>
