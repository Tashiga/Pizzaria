<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/pizza-logo.png" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="CheesyPizza Topia" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/amount">Amount</RouterLink>
        <RouterLink to="/pizza">Pizza</RouterLink>
        <RouterLink to="/members">Members</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
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

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;
    margin-top: 1rem;
  }
}
</style>
