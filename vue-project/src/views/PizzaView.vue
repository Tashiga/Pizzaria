<script setup lang="ts">
    import { ref, type Ref , onMounted} from 'vue';
    import {type Pizza, type Ingredient} from '@/model/pizza';
    import PizzaService from '@/api/pizzaService';

    const pizzas: Ref<Pizza[]|undefined> = ref();

    onMounted(async () => {
        console.log('On essaye de récupérer les pizzas');
        await fetchPizzas();
        console.log('récupération vaut : ', pizzas.value);

        // 'SELECT * FROM pizza_ingredient INNER JOIN pizza ON pizza.id = pizza_ingredient.pizzaId INNER JOIN ingredient ON ingredient.id = pizza_ingredient.ingredientId'
    });

    let loading: Ref<boolean> = ref(false);

    async function fetchPizzas() {
        try {
            console.log('try to get pizzas [front]');
            const response = await PizzaService.getPizzas().then(response => {
                pizzas.value = Object.values(response.data);
                console.log(response.data);
                loading.value = true;
                // filteredPizzas();
            });
            console.log('get : ', pizzas.value);
        } catch (error) {
            console.error(error); 
        }
    }

    function getPizzas(): Pizza[] {
        let v : Pizza[][] = pizzas.value;
        return v === undefined ? [] : v[0];
    }

    const pizzaToAdd: Ref<string> = ref('');
    const priceToAdd: Ref<number> = ref(0);

    async function addPizza(newPizza: string, newPrice: number){
        if(newPrice>0) {
            let pizzaToAdd: Pizza = {
                id: 0,
                name: newPizza,
                price: newPrice
            }
            try {
                const response = await PizzaService.addPizza(pizzaToAdd);
            } catch (error) {
                console.error(error); 
            }
        }
        // pizzas.value.push({name: newPizza, price: newPrice});
    }


</script>

<template>
    <main>
        <div>
            <div class="leftPizza">
                <img alt="Vue Pizza" class="pizza" src="@/assets/pizza.svg"  />
            </div>
            <div class="rightPizza">
                <div v-if="loading">
                    <ul>
                        <li v-for="pizza in getPizzas()">
                            {{pizza.name }}, coûte {{ pizza.price }} euros.
                        </li>
                    </ul>
                </div>
                <div v-else class="custom-spinner"></div>
            </div>

        </div>

        <hr style="width: 100%;">
            
        <div>
            <h1>Pizza à ajouter : {{ pizzaToAdd }}</h1>
            <div> 
                <label>Name : </label>
                <input placeholder="name" type="text" v-model="pizzaToAdd"/> <br>
                <label>Price : </label>
                <input placeholder="price" type="number" v-model="priceToAdd"/><br>
                <button class="floatRight" @click="addPizza(pizzaToAdd, priceToAdd)">Ajouter</button>
            </div>
        </div>
        
    </main>
</template>

<style>
.leftPizza{
    float: left;
    margin-right: 50px;
}

.rightPizza{
    display: flex;
}

.pizza{
    width: 125px;
    height: 125px;
}

.custom-spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #7983ff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.add{
    border: 3px solid red;
    display: block;
    height: fit-content;
}

.floatRight{
    float: right;
    display: block;
    margin: 5px;
}

</style>