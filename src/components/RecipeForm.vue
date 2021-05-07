<template>
  <v-card flat class="ma-0 mt-10 pa-1">
    <v-form ref="form" @submit.prevent="openD">
      <v-text-field
        label="Rezept Name"
        v-model="recipe.recipeName"
        :rules="filled"
        filled
      ></v-text-field>

      <v-sheet>
        <v-row align="end">
          <v-col cols="12" md="6">
            <div class="headline mx-3">Zutaten</div>
            <v-list>
              <v-row>
                <v-col cols="4"><b>Menge</b></v-col>
                <v-col cols="8"><b>Zutat</b></v-col>
              </v-row>
              <v-divider></v-divider>
              <transition-group name="slide">
                <template v-for="(item, i) in recipe.ingredients">
                  <v-divider v-if="i !== 0" :key="`${i}-divider`"></v-divider>
                  <v-list-item class="slide" :key="item.nr">
                    <v-list-item-title>
                      <v-row>
                        <v-col cols="3">
                          {{ item.menge }}
                        </v-col>
                        <v-col cols="9">
                          <template v-if="i == editItem">
                            <v-form
                              ref="editIngredient"
                              @submit.prevent="editItem = null"
                            >
                              <v-text-field
                                label="Name"
                                v-model="recipe.ingredients[i].name"
                                @click:append.prevent="editItem = null"
                                append-icon="mdi-content-save"
                              ></v-text-field>
                            </v-form>
                          </template>
                          <template v-else>
                            {{ item.name }}
                            <div class="float-right">
                              <v-btn x-small @click="editItem = i">edit</v-btn>
                            </div>
                          </template>
                        </v-col>
                      </v-row>
                    </v-list-item-title>
                  </v-list-item>
                </template>
              </transition-group>
            </v-list>
          </v-col>
          <v-col cols="12" md="6">
            <v-form @submit.prevent="addIngredient" ref="zutatForm">
              <v-row no-gutters>
                <v-col cols="1">
                  <v-icon left>mdi-tag-plus</v-icon>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    outlined
                    label="Menge"
                    style="width: 100px"
                    name="menge"
                  ></v-text-field>
                </v-col>
                <v-col cols="8">
                  <v-text-field
                    outlined
                    class="mx-2"
                    name="name"
                    placeholder="Zutat"
                  >
                    <template v-slot:append-outer>
                      <v-btn rounded type="submit"
                        ><v-icon>mdi-plus</v-icon></v-btn
                      >
                    </template>
                  </v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-col>
        </v-row>
      </v-sheet>

      <v-sheet
        elevation="2"
        style="position:relative;"
        class="stepsheet pa-3 pb-0 mb-14"
      >
        <template v-for="(step, i) in recipe.recipeDescription">
          <v-textarea
            background-color="white"
            :key="i"
            height="100px"
            outlined
            :label="step.nr + '. Schritt'"
            v-model="step.text"
            :rules="filled"
            :append-icon="step.nr > 1 ? 'mdi-minus' : ''"
            @click:append="deleteStep(i)"
          ></v-textarea>
        </template>
        <div width="100%" class="ma-0 pa-0 text-center">
          <v-btn
            style="position:relative; bottom: -36px; box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.3);"
            class="mx-auto rounded-b-pill"
            color="white"
            @click="addStep"
            ><v-icon>mdi-plus</v-icon></v-btn
          ><br />
        </div>
      </v-sheet>
      <v-row>
        <v-col cols-12>
          <v-btn outlined class="primary" @click="onPickFile" dark>
            <v-icon left>mdi-camera-outline</v-icon>
            Bild hochladen
          </v-btn>
          <input
            class="caption ma-2"
            v-show="false"
            contenteditable="false"
            type="file"
            prepend-icon="mdi-camera"
            ref="fileInput"
            @change="onFilePicked"
          />
          <span v-if="image"> {{ filename }}</span>
          <v-btn text>X</v-btn>
          <v-img width="100" :src="recipe.imageSrc"></v-img>
        </v-col>
        <v-col cols="12" lg="6">
          <v-dialog
            transition="dialog-bottom-transition"
            fullscreen
            v-model="imageDialog"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-on="on" v-bind="attrs" @click="loadImages"
                >Online Bilder</v-btn
              >
            </template>
            <v-card>
              <v-toolbar color="primary">
                <v-toolbar-title>Bildergallerie</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                  <v-btn text @click="imageDialog = false"
                    ><v-icon>mdi-close</v-icon></v-btn
                  >
                </v-toolbar-items>
              </v-toolbar>
              <v-row>
                <v-col
                  cols="6"
                  md="3"
                  lg="3"
                  v-for="(image, i) in imageGallery"
                  :key="i"
                >
                  <v-card link @click="addImageToRecipe(image)" rounded="xl"
                    ><v-img :src="image.downloadUrl" cover></v-img
                  ></v-card>
                </v-col>
              </v-row>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>

      <v-btn type="submit" block tile large elevation="5">Speichern </v-btn>
      <v-card-text class="caption">name:{{recipe.imageName}}</v-card-text>
      <v-card-text class="caption">src: {{recipe.imageSrc}}</v-card-text>
      <v-dialog
        persistent
        v-if="savedRecipe"
        v-model="finishDialog"
        max-width="25em"
      >
        <v-card>
          <v-card-title class="headline">
            Willst du das Rezept <br />"{{ savedRecipe.recipeName }}" <br />
            speichern?
          </v-card-title>
          <v-card-text
            ><p v-for="step in savedRecipe.recipeDescription" :key="step.nr">
              {{ step.text }}
            </p>
            <p>{{ savedRecipe.ingredients }}</p>
            <p>{{ savedRecipe.filename }}</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="finishDialog = false">
              Abrechen
            </v-btn>
            <v-btn color="green darken-1" text @click="saveFile">
              Speichern
            </v-btn>
          </v-card-actions>

        </v-card>
      </v-dialog>
    </v-form>
  </v-card>
</template>

<script>
import { fireBucket } from "@/plugins/firebase";

export default {
  name: "RecipeForm",
  props: { recipe: Object },
  data: () => ({
    imageDialog: false,
    imageLoading: false,
    imageGallery: null,
    recipeName: "",
    recipeImage: { active: false, imageSrc: "" },
    ingredients: [],
    editItem: null,
    steps: [{ nr: 1, text: "" }],
    recipeDescription: "",
    imgsrc: "",
    image: null,
    savedRecipe: null,
    filled: [v => v != "" || "Field must not be empty"],
    finishDialog: false
  }),
  methods: {
    addImageToRecipe(image) {
      console.log("add", image.downloadUrl);
      this.recipe.imageSrc = image.downloadUrl;
      this.imageDialog = false
      console.log("recipe", this.recipe)
    },
    loadImages() {
      //https://firebasestorage.googleapis.com/v0/b/recipes-petzi.appspot.com/o/recipes%2F3Gq98gGeUOzwj5Xm1EfO.png?alt=media&token=419bc575-f8e6-48c9-a665-2df89c0953c5
      this.imageLoading = true;
      let storage = fireBucket;
      let storageRef = storage.ref();
      let listRef = storageRef.child("recipes");
      listRef
        .listAll()
        .then(res => {
          let images = [];

          res.items.forEach(item => {
            const fullPath = item.fullPath;
            let image = {
              imageSrc: "",
              downloadUrl: "",
              imageName: item.name,
              imageFullPath: fullPath
            }
            storageRef
              .child(fullPath)
              .getMetadata()
              .then(meta => {
                image.imageSrc= meta.bucket;
              });
            storageRef
              .child(fullPath)
              .getDownloadURL()
              .then(url => {
                image.downloadUrl= url;
              });
            images.push(image)
          });
          this.imageGallery = images;
        })
        .then(() => {
          this.imageLoading = false;
        });
    },
    saveFile() {
      this.$emit("saveRecipe", this.recipe);
      this.$router.back();
    },
    addIngredient(event) {
      console.log(event);
      const newItem = {
        nr: this.recipe.ingredients.length + 1,
        menge: event.target.menge.value,
        name: event.target.name.value
      };

      console.log("add ingredient", newItem);
      this.recipe.ingredients.push(newItem);
      this.$refs.zutatForm.reset();
    },
    addStep() {
      if (this.steps.length <= 9) {
        const x = { nr: this.steps.length + 1, text: "" };
        this.steps.push(x);
      }
    },
    deleteStep(n) {
      if (this.steps.length > 1) {
        this.steps.splice(n, 1);
      }
    },
    onPickFile() {
      this.$refs.fileInput.click();
    },
    openD() {
      let saveR = {
        recipeName: this.recipe.recipeName,
        recipeDescription: this.recipe.steps,
        imageName: this.recipe.filename,
        imageSrc: this.recipe.imageSrc,
        ingredients: this.recipe.ingredients,
        createdBy: this.$store.getters.getUser,
        time: Date.now()
      };

      if (this.$refs.form.validate()) {
        this.savedRecipe = saveR;
        this.finishDialog = true;
        this.$store.commit("loading", true);
      }
    },
    onFilePicked(event) {
      const files = event.target.files;
      this.filename = files[0].name;
      if (this.filename.lastIndexOf(".jpg") <= 0) {
        return alert("Falsch!");
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imgsrc = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
    }
  },
  computed: {},
  beforeMount() {}
};
</script>

<style scoped></style>
