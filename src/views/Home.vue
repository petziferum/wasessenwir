<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="11" lg="6">
        <v-card>
          <div class="pa-2">
            <v-form ref="searchForm" @submit.prevent="search">
              <v-text-field
                v-model="searchValue"
                id="search-item"
                label="Rezept suchen"
                prepend-icon="mdi-magnify"
              ></v-text-field>
            </v-form>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="11">
        <v-tabs v-model="tab">
          <div class="pa-2">Rezepte</div>
          <v-tab-item class="mt-0 pa-0 elevation-4">
            <List v-on:recipe="showRecipe" :items="recipes" />
          </v-tab-item>
          <v-tab-item>
            <Recipe v-on:back="tab = 0" :recipe="activeRecipe"></Recipe>
          </v-tab-item>
        </v-tabs>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import List from "@/components/MealList";
import Recipe from "@/components/Recipe";
import firebase from "firebase";
export default {
  name: "Home",
  components: {
    List: List,
    Recipe: Recipe
  },
  data: () => ({
    searchValue: "",
    activeRecipe: null,
    tab: 0,
    images: ""
  }),
  methods: {
    search(value) {
      console.info("Es wird nach", value.target[0].value, "gesucht");
    },
    getImages() {
      const storageRef = firebase.storage().ref();
      const imageRef = storageRef.child("recipes");
      imageRef.listAll().then(res => {
        res.items.forEach(el => {
          this.images =
            "https://" + el.location.bucket + "/" + el.location.path;
        });
      });
    },
    showRecipe(n) {
      this.activeRecipe = n;
      this.tab = 1;
      console.info("recipe", n);
      this.searchValue = "";
    }
  },
  computed: {
    recipes() {
      return this.$store.getters.getRecipes;
    },
    searchItem() {
      return this.$store.getters.getRecipes.filter(el => {
        return this.searchValue
          .toLowerCase()
          .split(" ")
          .every(v => el.recipeName.toLowerCase().includes(v));
      });
    }
  },
  beforeMount() {
  }
};
</script>
