<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
</script>

<template>
  <h1>Bienvenue à CheesyPizza Topia !</h1>
  <br>
  <span class="message">Vous trouverez dans cette application, différentes espace : 
     <ul>
      <li>espace dédié aux admins</li>
      <li>espace dédié aux clients</li>
      <li>espace dédié aux staffs</li>
     </ul>
    </span>
</template>

<style>

.message{
  text-align: justify;
}
</style>
