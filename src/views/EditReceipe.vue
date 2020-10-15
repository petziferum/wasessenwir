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
              <v-text-field label="Rezept Name" v-model="title"></v-text-field> <!--ToDo: Titel muss noch geupdated werden -->
              <v-textarea label="Anleitung" v-model="content"></v-textarea>
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
    content: "",
    title: ""
  }),
  methods: {
    saveEditedContent() {
      db.collection("recipes")
        .doc(this.recipe.id)
        .update({
          recipeDescription: this.content
        })
        .then(() => {
          console.log("Document successfully updated!");
          this.$store.dispatch("getRecipes");
        })
        .finally(() => {
          this.$emit("home");
        });
    }
  },
  mounted() {
    this.content = this.recipe.recipeDescription;
    this.title = this.recipe.recipeName;
  }
};
</script>

<style scoped></style>
