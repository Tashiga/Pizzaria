<script setup lang="ts">
    import { ref, type Ref , onMounted} from 'vue';
    import {type Pizza, type Ingredient} from '@/model/pizza';
    import PizzaService from '@/api/pizzaService';
    import IngredientService from '@/api/ingredientService';
    import toastr from 'toastr';
    import 'toastr/build/toastr.min.css';
    import { computed } from 'vue';
    import { useStore } from 'vuex';  
    import { useI18n } from 'vue-i18n';
    import CreatePizza from '../components/CreatePizza.vue'
import { Role } from '@/model/user';

    const pizzas: Ref<Pizza[]|undefined> = ref();
    const ingredients: Ref<Ingredient[]|undefined> = ref();
    let loading: Ref<boolean> = ref(true);
    let loadIngredients: Ref<boolean> = ref(true);
    const pizzaToAdd: Ref<string> = ref('');
    const priceToAdd: Ref<number> = ref(0);    
    const ingredientToAdd: Ref<string> = ref('');
    let showModal: Ref<Boolean> = ref(false);
    let PizzaIngredients: Ref<Ingredient[]|undefined> = ref([]);
    let pizzaToShow: Ref<Pizza> = ref({id: 0, name: '', price: 0});
    const store = useStore();
    let isConnected: Ref<boolean> = ref(false);
    let isAnAdmin: Ref<boolean> = ref(false);
    const { t } = useI18n();

    onMounted(async () => {
        await fetchPizzas();
        await fetchIngredients();
        const loger = computed(() => store.getters.isLoggedIn);
        const role = computed(() => store.getters.getRole);
        if(loger && loger.value){
            isConnected.value = true;
            if(role && role.value && role.value == Role.Admin)
                isAnAdmin.value = true;
        }
        console.log("test -> ", isAnAdmin.value);
    });

    async function fetchPizzas() {
        try {
            console.log('try to get pizzas [front]');
            const response = await PizzaService.getPizzas().then(response => {
                pizzas.value = Object.values(response.data);
                console.log(response.data);
                loading.value = false;
                // filteredPizzas();
            });
            console.log('get : ', pizzas.value);
        } catch (error) {
            console.error(error); 
        }
    }

    async function fetchIngredients() {
        try  {
            console.log('try to get ingredients [front]');
            const response = await IngredientService.getIngredients().then(response => {
                ingredients.value = Object.values(response.data);
                console.log(response.data);
                loadIngredients.value = false;
            });
            console.log('get ing : ', ingredients.value);
        } catch (error) {
            console.error(error);
        }
    }
    
    function getPizzas(): Pizza[] {
        let v : Pizza[][] | any = pizzas.value;
        return v === undefined ? [] : v[0];
    }
    
    function getIngredients(): Ingredient[] {
        let w: Ingredient[][] | any = ingredients.value;
        return w === undefined ? [] : w[0];
    }

    async function deleteIngredient(ingredientId: number) {
        try {
            const response = await IngredientService.deleteIngredientbyId(ingredientId);
            toastr.success('Ingrédient '+ t('deleted'));
        } catch (error) {
            console.error(error);
        }
        finally{
            fetchIngredients();
        }
    }

    function viewIngredients(pizza: Pizza) {
        showModal.value = !showModal.value;
        pizzaToShow.value = pizza;
        PizzaIngredients.value = pizza.ingredients;

    }

    function closeModal() {
        showModal.value = false;
        pizzaToShow.value = {id: 0, name: '', price: 0};
        PizzaIngredients.value = [];
    }

    function updatePizzaList() {
      fetchPizzas();
    }

    function updateIngredientList() {
        fetchIngredients();
    }


</script>

<template>
    <main>

        

        <!-- Display all pizzas -->
        <div class="content">
            <h1>{{ $t('Display all-f') }} Pizzas</h1>
            <div v-if="!loading">
                <div v-for="(pizza, index) in getPizzas()" :key="index" class="motsPizza"> 
                    {{ pizza.name }} {{ $t('costs') }} {{ pizza.price }} €
                    <img alt="Display ingredient of Pizza" width="20" src="@/assets/info.svg" @click="viewIngredients(pizza)" /> 
                </div>
            </div>
            <div v-else class="custom-spinner"></div>

            <!-- Modale to display pizza's ingredients -->
            <div class="modal" v-if="showModal">
                <div class="modal-content" >
                    <div v-if="PizzaIngredients">
                        <h2>{{ $t('Voici les ingredients du') }} {{ pizzaToShow.name }}</h2>
                        <ul >
                            <li v-for="ing in PizzaIngredients"> {{ ing.name }}</li>
                        </ul>
                    </div>
                    <div v-else>
                        <h2>{{ pizzaToShow.name }} {{ $t('no_ingredients') }}</h2>
                    </div>
                    <!-- Bouton pour fermer la modale -->
                    <button @click="closeModal">{{ $t('close') }}</button>
                </div>
            </div>

        </div>

        <hr style="width: 100%;">

        <!-- Display all ingredients -->
        <div class="content">
            <h1>{{ $t('Display all-m') }} Ingredients</h1>
            <div v-if="!loadIngredients">
                <div v-for="(mot, index) in getIngredients()" :key="index" class="mot"> 
                    <span> {{ mot.name }} </span>
                    <img v-if="isConnected && isAnAdmin" alt="Delete user" class="deleteIcon" src="@/assets/delete.svg" width="20" @click="deleteIngredient(mot.id)"/> 
                </div>
            </div>
            <div v-else class="custom-spinner"></div>
        </div>

        <hr style="width: 100%;">

        <CreatePizza @pizzaCreated="updatePizzaList" @ingredientCreated="updateIngredientList"/>
        
    </main>
</template>

<style>

.pizza{
    width: 125px;
    height: 125px;
}

.ingredient{
    width: 10px;

}

.deleteIcon{
    float: right;
}

.content{
    margin: 20px;
    margin-bottom: 30px;
}

.labels{
    display: inline-block;
    margin: 10px;
}

.custom-spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #7983ff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

h1 {
    text-align: center;
}

.mot{
    display: inline-block;
    padding: 2px;
    width: calc(100% / 5);
    border: 1px solid gray;
    text-align: center;
}

.motsPizza{
    display: inline-block;
    padding: 2px;
    width: calc(100% / 5);
    border: 1px solid gray;
    text-align: center;
}

.floatRight{
    float: right;
    margin-bottom: 20px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

</style>