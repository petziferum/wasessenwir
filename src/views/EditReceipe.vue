<template>
  <v-container>
    <v-card outlined>
      <v-toolbar dense>
        <v-toolbar-items>
          <v-btn icon>
            <v-icon @click="$emit('back')" color="accent">mdi-arrow-left-bold</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-title>Edit Recipe: {{ recipe.recipeName }}</v-card-title>
      <v-card-actions>
        <v-row>
          <v-col cols="12">
            <v-form ref="formContent" @submit.prevent="saveEditedContent">
              <v-text-field label="Rezept Name" v-model="recipe.recipeName"></v-text-field>
              <v-sheet elevation="4" class="pa-3">
                <template v-for="step in recipe.recipeDescription">
                <v-textarea filled :label="'Schritt: ' + step.nr" v-model="step.text" :key="step.nr"
              class="mb-0 mt-0 py-0"></v-textarea>
                </template>
              </v-sheet>
              <div width="100%" style="border: 0px solid" class="ma-0 pa-0 text-center">
              <v-btn elevation="4" class="mt-0 mx-auto rounded-b-pill" color="secondary" @click="addStep"><v-icon>mdi-plus</v-icon></v-btn><br>
              </div>
              <v-btn type="submit">speichern</v-btn>
            </v-form>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import db from "@/plugins/firebase";
export default {
  name: "EditReceipe",
  props: {
    recipe: {
      type: Object
    }
  },
  data: () => ({
  }),
  methods: {
    addStep() {
      if (this.recipe.recipeDescription.length <= 9) {
        const x = { nr: this.recipe.recipeDescription.length + 1, text: "" };
        this.recipe.recipeDescription.push(x);
      }
    },
    saveEditedContent() {
      db.collection("recipes")
        .doc(this.recipe.id)
        .update({
          recipeName: this.recipe.recipeName,
          recipeDescription: this.recipe.recipeDescription
        })
        .then(() => {
          console.log("Document successfully updated!");
          this.$store.dispatch("getRecipes");

        })
        .finally(() => {
          this.$emit("home");
        });
    }
  }

};
</script>

<style scoped></style>
