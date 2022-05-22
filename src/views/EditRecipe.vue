<template>
  <v-container fluid class="pa-0">
    <v-toolbar class="ma-0">
      <v-toolbar-title
        >Rezept bearbeiten - loading: {{ loading }}</v-toolbar-title
      >
      <v-toolbar-items slot="extension">
        <v-btn @click="$router.back()">
          <v-icon>mdi-arrow-left-bold-outline</v-icon>
        </v-btn>
        <v-btn color="red" dark @click="deleteRecipe">
          <v-icon>
            mdi-delete
          </v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-row justify="center">
      <v-col cols="12" md="9" lg="6">
        <template v-if="loading">
          <v-skeleton-loader
            class="mt-10"
            type="article, actions"
          ></v-skeleton-loader>
        </template>
        <template v-else>
          {{ recipe.recipeName }}
          <recipe-form
            :recipe-object="recipe"
            :edit="true"
            v-on:saveRecipe="updateRecipe"
          ></recipe-form>
        </template>
      </v-col>
    </v-row>
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
    editRecipeId: null,
    id: null
  }),
  methods: {
    deleteRecipe() {
      firestore
        .collection("recipes")
        .doc(this.id)
        .delete()
        .then(() => {
          this.$toast.error("Rezept " + this.id + " wurde gelöscht.");
        })
        .catch(err => {
          console.log("fehler", err);
        })
        .finally(() => {
          this.$router.push("/saveRecipe");
        });
    },
    updateRecipe(daten) {
      console.log("empfangen", daten.id, daten.createdBy);

      firestore
        .collection("recipes")
        .doc(daten.id)
        .update(daten)
        .then(() => {
          console.log("geupdated");
          this.getRecipe(daten.id);
        })
        .catch(error => {
          console.error(error);
        });
      this.$router.back();
    },
    getRecipe(id) {
      this.loading = true;

      console.info("lade...");
      let recipeRef = firestore.collection("recipes").doc(id);

      recipeRef
        .get()
        .then(doc => {
          let r = doc.data();
          this.recipe = r;
          this.recipe.id = doc.id;
          console.log("Rezept geladen", r);
        })
        .finally(() => (this.loading = false));
    }
  },
  watch: {
    $route: console.log("route change")
  },
  beforeMount() {
    this.id = this.$route.params.id;
    console.log("mounting...", this.$route.params.id);
    this.getRecipe(this.$route.params.id);
  }
};
</script>

<style scoped></style>
