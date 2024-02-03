<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
</script>

<template>
  <h1>{{ $t('welcome_to')}} CheesyPizza Topia !</h1>
  <br>
  <span class="message"> {{ $t('welcome_msg1')}} 
     <ul>
      <li> {{ $t('welcome_msg2')}}</li>
      <li> {{ $t('welcome_msg3')}}</li>
      <li> {{ $t('welcome_msg4')}}</li>
     </ul>
    </span>
</template>

<style>

.message{
  text-align: justify;
}
</style>
