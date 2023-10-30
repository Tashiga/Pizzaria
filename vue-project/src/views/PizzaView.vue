<script setup lang="ts">
    import { ref, type Ref } from 'vue';

    type Pizza = {
        name: string;
        price: number;
    };

    const pizzas: Ref<Pizza[]> = ref ([  
        {name: "pepperoni", price : 13}, 
        {name: "Légume du solei", price : 6}, 
        {name: "6 fromages", price : 14}
    ]);
    const pizzaToAdd: Ref<string> = ref('');
    const priceToAdd: Ref<number> = ref(0);

    function addPizza(newPizza: string, newPrice: number): void{
        pizzas.value.push({name: newPizza, price: newPrice});
    }

    function removePizza(pizza: string): void{
        // pizzas.value
        // need to delete pizza from list
    }

</script>

<template>
    <main>
        <div class="leftPizza">
            <img alt="Vue Pizza" class="pizza" src="@/assets/pizza.svg" width="125" height="125" />
        </div>
        <div>
            <div>
                <ul>
                    <li v-for="pizza in pizzas">
                        {{pizza.name }}, coûte {{ pizza.price }} euros.
                    </li>
                </ul>
            </div>
            <h1>Pizza à ajouter : {{ pizzaToAdd }}</h1>
            <div> 
                <input type="text" v-model="pizzaToAdd"/>
                <input type="number" v-model="priceToAdd"/>
                <button @click="addPizza(pizzaToAdd, priceToAdd)">Ajouter</button>
            </div>
        </div>
        
       
    </main>
</template>

<style>
.leftPizza{
    float: left;
    margin-right: 50px;
}

</style>