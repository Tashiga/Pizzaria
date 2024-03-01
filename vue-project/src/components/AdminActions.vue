
<script setup lang="ts">
    import { ref, type Ref , onMounted, getCurrentInstance} from 'vue';
    import CreatePizza from '../components/CreatePizza.vue';
    import CreateUser from '../components/CreateUser.vue';
    import CreateAccount from '../components/CreateAccount.vue';

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
            <div>
                <div class="composant blocks">
                    <CreatePizza/>
                </div>
                <div class="composant blocks" style="padding: 10px;">
                    <CreateUser/>
                </div>
                <div class="composant blocks" style="padding: 10px; width: 40%;">
                    <CreateAccount/>
                </div>
            </div>
            
            
        </div>
        
    </main>
</template>

<style>

.blocks{
    font-size: 0.8em; 
    width: 30%; 
    border: 0.5px solid white; 
    display: inline-block;
    vertical-align: top;
}

.composant{
    font-size: 0.8em; 
    width: 30%; 
    border: 0.5px solid white;
}

.composant input {
    width: 50%;
    font-size: 0.9em;
}

.composant h1{
    font-size: 1.5em;
    margin-bottom: 15px;
}

.composant button{
    font-size: 1em;
}

.composant .labels{
    margin:0px;
    margin-bottom:2px;
}

</style>