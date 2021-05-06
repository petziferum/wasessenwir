<template>
  <v-container fluid class="pa-0">
    <v-toolbar class="ma-0">
      <v-toolbar-title>Rezept bearbeiten</v-toolbar-title>
      <v-toolbar-items slot="extension">
        <v-btn @click="$router.back()">
          <v-icon>mdi-arrow-left-bold-outline</v-icon>
        </v-btn>
        <v-btn>
          <v-icon>
            mdi-content-save
          </v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <template v-if="loading">
      <v-skeleton-loader
        class="mt-10"
        type="article, actions"
      ></v-skeleton-loader>
    </template>
    <template v-else>
      <recipe-form
        :recipe="recipe"
        v-on:saveRecipe="updateRecipe"
      ></recipe-form>
    </template>
  </v-container>
</template>

<script>
import { firestore } from "@/plugins/firebase";
import RecipeForm from "@/components/RecipeForm";

export default {
  props: [""],
  components: {
    RecipeForm
  },
  data: () => ({
    recipe: null,
    loading: true,
    editRecipeId: null
  }),
  methods: {
    updateRecipe(daten) {
      console.log("empfangen", daten.id);

      firestore
        .collection("recipes")
        .doc(this.recipe.id)
        .update(daten)
        .then(() => {
          console.log("geupdated")
          this.getRecipe();
        }).catch(error => {
          console.error(error)
      });
    },
    getRecipe() {
      this.loading = true;
      console.info("lade...");
      let recipeRef = firestore
        .collection("recipes")
        .doc(this.$route.params.id);

      recipeRef.get().then(doc => {
        let r = doc.data();
        this.recipe = r;
        this.recipe.id = doc.id;
        this.loading = false;
        console.log("geladen", r);
      });
    }
  },
  watch: {
    $route: console.log("route change")
  },
  mounted() {
    console.log("mounting...", this.$route.params.id);
    this.getRecipe();
  }
};
</script>

<style scoped></style>
