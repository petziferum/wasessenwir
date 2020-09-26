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
            <List v-on:recipe="showRecipe" :items="searchItem" />
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
    recipes: [
      {
        id: "m1",
        name: "Spaghetti",
        description: "Spaghetti mit Hackfleisch Tomaten Soße"
      },
      { id: "m2", name: "Quiche", description: "Eine Quiche mit Eiern" },
      { id: "m3", name: "Kasspatzen", description: "Kasspatzen" },
      { id: "m4", name: "Brotzeit", description: "Brot mit Aufstrich" }
    ]
  }),
  methods: {
    search(value) {
      console.info("Es wird nach", value.target[0].value, "gesucht");
    },
    showRecipe(n) {
      this.activeRecipe = n;
      this.tab = 1;
      console.info("recipe", n);
      this.searchValue = ""
    }
  },
  computed: {
    searchItem() {
      return this.recipes.filter(el => {
        return this.searchValue
          .toLowerCase()
          .split(" ")
          .every(v => el.description.toLowerCase().includes(v));
      });
    }
  }
};
</script>
