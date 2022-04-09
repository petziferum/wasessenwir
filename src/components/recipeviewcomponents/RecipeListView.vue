<template>
  <v-card>
    <v-card-title>
      Benutzerrezepte
    </v-card-title>
    <v-card-subtitle>
      <v-btn small @click="getUserRecipes">Rezepte laden</v-btn>
    </v-card-subtitle>
    <v-card-text>
      <v-list>
        <v-list-group v-for="r in userRecipes" :key="r.id">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>{{ r.recipeName }}</v-list-item-title>
            </v-list-item-content>
          </template>
          <small-recipe-card :r="r" />
        </v-list-group>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import SmallRecipeCard from "@/components/recipeviewcomponents/SmallRecipeCard";
export default {
  name: "RecipeListView",
  props: ["userData", "userRecipes"],
  components: { SmallRecipeCard },
  data: () => ({
  }),
  methods: {
    getUserRecipes() {
      this.$emit("getRecipes")
    }
  }
};
</script>

<style scoped></style>
