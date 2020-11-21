<template>
  <v-container>
    <v-card outlined>
      <v-toolbar dense>
        <v-toolbar-items>
          <v-btn icon>
            <v-icon @click="$emit('back')" color="accent"
              >mdi-arrow-left-bold</v-icon
            >
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-title
        >Edit Recipe: {{ recipe.recipeName }} {{ imagePicker }}</v-card-title
      >
      <v-row>
        <v-col cols="6">
          <v-card
            max-width="100px"
            max-height="100px"
            elevation="1"
            class="text-center mb-4"
            style="cursor:pointer;"
            link
            @click="getImages"
            ><v-img
              v-if="recipe.imageSrc != ''"
              aspect-ratio="1"
              :src="recipe.imageSrc"
            ></v-img
            ><v-icon v-else large>mdi-pencil</v-icon></v-card
          >
        </v-col>
        <v-col cols="6" style="border:1px solid;">
          <image-upload v-on:uploaded="putImageOnRecipe"></image-upload>
        </v-col>
      </v-row>
      <v-row v-if="imagePicker">
        <v-col
          v-for="(img, i) in images"
          :key="i"
          cols="6"
          sm="4"
          md="4"
          class="text-center"
        >
          <v-img
            :src="img"
            class="elevation-3"
            @click="putImageOnRecipe(img)"
            style="cursor: pointer"
            max-width="100px"
            max-height="100px"
          ></v-img>
        </v-col>
      </v-row>
      <v-card-actions>
        <v-row>
          <v-col cols="12">
            <v-form ref="formContent" @submit.prevent="saveEditedContent">
              <v-text-field
                label="Rezept Name"
                v-model="recipe.recipeName"
              ></v-text-field>
              <v-sheet elevation="4" class="pa-3">
                <template v-for="step in recipe.recipeDescription">
                  <v-textarea
                    filled
                    :label="'Schritt: ' + step.nr"
                    v-model="step.text"
                    :key="step.nr"
                    class="mb-0 mt-0 py-0"
                  ></v-textarea>
                </template>
              </v-sheet>
              <div
                width="100%"
                style="border: 0px solid"
                class="ma-0 pa-0 text-center"
              >
                <v-btn
                  elevation="4"
                  class="mt-0 mx-auto rounded-b-pill"
                  color="secondary"
                  @click="addStep"
                  ><v-icon>mdi-plus</v-icon></v-btn
                ><br />
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
import firebase from "firebase";
import ImageUpload from "@/components/ImageUpload";
export default {
  name: "EditReceipe",
  props: {
    recipe: {
      type: Object
    }
  },
  components: { ImageUpload },
  data: () => ({
    imagePicker: false,
    images: []
  }),
  methods: {
    addStep() {
      if (this.recipe.recipeDescription.length <= 9) {
        const x = { nr: this.recipe.recipeDescription.length + 1, text: "" };
        this.recipe.recipeDescription.push(x);
      }
    },
    getImages() {
      this.imagePicker = true;
      let storage = firebase.app().storage();
      let storageRef = storage.ref();
      let listRef = storageRef.child("recipes");
      listRef.listAll().then(res => {
        let image = [];
        res.items.forEach(item => {
          storageRef
            .child(item.fullPath)
            .getDownloadURL()
            .then(url => {
              image.push(url);
            });
        });
        this.images = image;
      });
    },
    putImageOnRecipe(img) {
      this.recipe.imageSrc = img;
      this.imagePicker = false;
    },
    saveEditedContent() {
      db.collection("recipes")
        .doc(this.recipe.id)
        .update({
          imageSrc: this.recipe.imageSrc,
          recipeName: this.recipe.recipeName,
          recipeDescription: this.recipe.recipeDescription
        })
        .then(() => {
          console.log("Document successfully updated!");
          this.images = [];
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
