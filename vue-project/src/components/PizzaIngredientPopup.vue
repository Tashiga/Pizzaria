<script lang="ts">
import {type Ingredient} from '@/model/pizza';


  export default {
    data() {
      return {
        showPopup: false,
        pizzaIngredients:[] as Ingredient[]// Les ingrédients de la pizza à afficher
      };
    },
    methods: {
      openPopupWithIngredients(ingredients: Ingredient[]) {
        this.pizzaIngredients = ingredients;
        this.showPopup = true;
      },
      closePopup() {
        this.showPopup = false;
        this.pizzaIngredients = [];
      }
    }
  };
  </script>
  
  <template>
    <div class="popup" v-if="showPopup">
      <div class="popup-content">
        <button @click="closePopup">Fermer</button>
        <!-- Affichage des données d'ingrédients de pizza -->
        <div v-if="pizzaIngredients">
          <h2>Ingrédients de la pizza :</h2>
          <ul>
            <li v-for="(ingredient, index) in pizzaIngredients" :key="index">{{ ingredient }}</li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  /* Styles pour le popup */
  .popup {
    /* Ajoutez les styles de positionnement et de style du popup ici */
  }
  
  .popup-content {
    /* Ajoutez les styles pour le contenu du popup ici */
  }
  
  /* Style pour le bouton Fermer */
  button {
    /* Styles pour le bouton de fermeture */
  }
  </style>