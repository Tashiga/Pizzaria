
<script setup lang="ts">
    import { ref, type Ref , onMounted, getCurrentInstance} from 'vue';
    import CreatePizza from '../components/CreatePizza.vue';

    onMounted(async () => {
    });
</script>


<template>
    <main>
        <div>
            <h1>Dashboard</h1>
            <!-- <span>Vous etes un admin et voici votre tableau de bord ! Vous trouverez toutes les actions que vous pouvez
                executer en tant qu'Admin. Merci de faire bon usage.
            </span> -->
            <div class="composant" style="font-size: 0.8em; width: 30%; border: 0.5px solid white">
                <CreatePizza/>
            </div>
            
        </div>
        
    </main>
</template>

<style>

.composant{
    font-size: 0.8em; 
    width: 30%; 
    border: 0.5px solid white;
}

.composant input {
    width: 60%;
    font-size: 0.9em;
}

.composant h1{
    font-size: 1.5em;
}

.composant button{
    font-size: 1em;
}

</style>