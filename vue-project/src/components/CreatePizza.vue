<script setup lang="ts">
    import { ref, type Ref , onMounted, getCurrentInstance} from 'vue';
    import { computed } from 'vue';
    import { useStore } from 'vuex';  
    import toastr from 'toastr';
    import {type Pizza, type Ingredient} from '@/model/pizza';
    import PizzaService from '@/api/pizzaService';
    import IngredientService from '@/api/ingredientService';
    import { useI18n } from 'vue-i18n';


    let isConnected: Ref<boolean> = ref(false);
    let isAnAdmin: Ref<boolean> = ref(false);
    const store = useStore();
    const pizzaToAdd: Ref<string> = ref('');
    const priceToAdd: Ref<number> = ref(0);      
    const ingredientToAdd: Ref<string> = ref(''); 
    const { t } = useI18n();
    let instance: any;

    onMounted(async () => {
        const loger = computed(() => store.getters.isLoggedIn);
        const isAdmin = computed(() => store.getters.isAdmin);
        if(loger && loger.value){
            isConnected.value = true;
            if(isAdmin && isAdmin.value)
                isAnAdmin.value = true;
        }
        console.log("test -> ", isAnAdmin.value);
        instance = getCurrentInstance();
        console.log("instance : ", instance);
    });

    async function addPizza(newPizza: string, newPrice: number){
        if(newPrice>0) {
            if (instance) {
                const { emit } = instance;
                let pizza: Pizza = {
                    id: 0,
                    name: newPizza,
                    price: newPrice
                }
                try {
                    const response = await PizzaService.addPizza(pizza);
                } catch (error) {
                    console.error(error); 
                }
                toastr.success('Pizza '+ t('created') + ' !');
                emit('pizzaCreated', pizza);
                pizzaToAdd.value = "";
                priceToAdd.value = 0;
            }
        }
    }

    async function createIngredient(newIngredient: string) {
        if(newIngredient != null){
            if (instance) {
                const { emit } = instance;
                let ingredient: Ingredient = {
                    id: 0,
                    name: newIngredient
                }
                try{
                    const response = await IngredientService.addIngredient(ingredient);
                } catch (error) {
                    console.error(error);
                    toastr.error(t('Something bad happened'));
                }
                toastr.success('Ingredient '+ t('created') + ' !');
                emit('ingredientCreated', ingredient);
                // fetchIngredients();
                ingredientToAdd.value = '';
            }
        }
    }

</script>


<template>
    <main>
        <div  v-if="isConnected && isAnAdmin">
            <!-- create new pizza -->
            <div class="content">
                <h1> {{ $t('Create new-f') }} Pizza </h1>
                <div> 
                    <div class="labels">
                        <label>{{ $t('Name') }} : </label>
                        <input type="text" v-model="pizzaToAdd"/>
                    </div>
                    <div class="labels">
                        <label>{{ $t('Price') }} : </label>
                        <input placeholder="price" type="number" v-model="priceToAdd"/>
                    </div>
                    <div class="labels">
                        <button @click="addPizza(pizzaToAdd, priceToAdd)">{{ $t('Create') }}</button>
                    </div>
                </div>
            </div>

            <hr style="width: 100%;">
                <!-- create new ingredient -->
            <div class="content">
                <h1>{{ $t('Create new-m') }} Ingredient </h1>
                <div> 
                    <div class="labels">
                        <label>{{ $t('Name') }} : </label>
                        <input type="text" v-model="ingredientToAdd"/>
                    </div>
                    <div class="labels">
                        <button @click="createIngredient(ingredientToAdd)">{{ $t('Create') }}</button>
                    </div>
                </div>
            </div>
        </div>
        
    </main>
</template>
