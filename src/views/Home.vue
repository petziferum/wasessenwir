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
        <v-toolbar color="accent">
          <v-toolbar-title class="pa-2">Rezepte</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="getRecipes">
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </v-toolbar>
        <v-tabs v-model="tab">
          <v-tab-item class="mt-0 pa-0">
            <List v-on:recipe="showRecipe" :items="recipes" />
          </v-tab-item>
          <v-tab-item>
            <Recipe
              v-on:back="tab = 0"
              :recipe="activeRecipe"
              v-on:editRecipe="editRecipe"
            ></Recipe>
          </v-tab-item>
          <v-tab-item>
            <edit-recipe
              v-on:back="tab = 1"
              v-on:home="tab = 0"
              :recipe="activeRecipe"
            ></edit-recipe>
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
import EditReceipe from "@/views/EditReceipe";
export default {
  name: "Home",
  components: {
    List: List,
    Recipe: Recipe,
    EditRecipe: EditReceipe
  },
  data: () => ({
    searchValue: "",
    activeRecipe: null,
    tab: 0,
    images: ""
  }),
  watch: {
    activeRecipe(val) {
      console.info("aktiv: ", val.recipeName)
    }
  },
  methods: {
    getRecipes() {
      this.$store.dispatch("getRecipes");
    },
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
    },
    editRecipe(n) {
      this.activeRecipe = n;
      this.tab = 2;
      console.info("Rezept bearbeiten", n.recipeName);
    }
  },
  computed: {
    recipes() {
      return this.$store.getters.getRecipes.filter(recipes => {
        return this.searchValue
          .toLowerCase()
          .split(" ")
          .every(v => recipes.recipeName.toLowerCase().includes(v));
      });
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
  beforeMount() {}
};
</script>
