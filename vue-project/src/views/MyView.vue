<script setup lang="ts">
    import { ref, type Ref } from 'vue';

    const amount = ref(0);

    function increaseAmount(): void {
        amount.value++;
    }
</script>

<template>
    <main>
        {{ amount }}
        <div v-if="amount <= 5">
            <button @click="increaseAmount()">Augmenter la valeur</button>
        </div>
        <div v-else>
            vous ne pouver pas augmenter la valeur de amount.
        </div>
       
    </main>
</template>

<style>

</style>