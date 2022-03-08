<template>
  <v-card flat class="ma-0 mt-10 pa-1">
    <v-form ref="form" @submit.prevent="openD">
      <v-text-field
        name="name"
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
                            <v-btn x-small color="red" @click="deleteItem(i)"
                              >delete
                            </v-btn>
                          </template>
                          <template v-else>
                            {{ item.name }}
                            <div class="float-right" v-if="editMode">
                              <v-btn class="mr-1" x-small @click="editItem = i"
                                >edit
                              </v-btn>
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
                      <v-btn rounded type="submit">
                        <v-icon>mdi-plus</v-icon>
                      </v-btn>
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
          <v-btn
            v-if="step.nr != recipe.recipeDescription.length"
            color="white"
            height="18px"
            class="rounded-b-pill"
            tile
            style="position: relative; top:-35px; left: 45%;"
            @click="addStepBetween(step.nr)"
            :key="`${i}+addStep`"
            >+
          </v-btn>
        </template>
        <div width="100%" class="ma-0 pa-0 text-center">
          <v-btn
            style="position:relative; bottom: -36px; box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.3);"
            class="mx-auto rounded-b-pill"
            color="white"
            @click="addStep"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <br />
        </div>
      </v-sheet>
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-col cols="6">
              <v-btn outlined class="primary" @click="pickFile" dark>
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
              <div v-if="imgsrc">
                <v-img width="100" class="ma-3 elevation-3" :src="imgsrc">
                  <v-overlay v-if="imageLoading" absolute class="text-center">
                    Loading...
                    <v-icon large>mdi-loading mdi-spin</v-icon>
                  </v-overlay>
                </v-img>
                <v-btn @click="uploadImage">upload</v-btn>
              </div>
            </v-col>
            <v-divider vertical inset></v-divider>
            <v-col cols="6">
              <v-toolbar class="ma-0">
                <v-toolbar-title class="font-weight-bold"
                  >Rezept Bild
                </v-toolbar-title>
              </v-toolbar>
              <span v-if="recipe.imageSrc">
                <div>{{ recipe.imageName }}</div>
                <v-img
                  width="100"
                  class="ma-3 elevation-3"
                  :src="recipe.imageSrc"
                ></v-img> </span
            ></v-col>
          </v-row>
        </v-col>
        <v-col cols="12" lg="6">
          <!--
          --
          -- Bilder Dialog Box
          --
          -->

          <v-dialog
            transition="dialog-bottom-transition"
            fullscreen
            v-model="imageDialog"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-on="on" v-bind="attrs" @click="loadImages"
                >Online Bilder
              </v-btn>
            </template>
            <v-card>
              <v-toolbar color="primary">
                <v-toolbar-title>Bildergallerie</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                  <v-btn text @click="imageDialog = false">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
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
                  <v-card link @click="addImageToRecipe(image)" rounded="xl">
                    <v-img :src="image.downloadUrl" cover></v-img>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
          </v-dialog>

          <!-- Ende Bilder Auswahl Dialog
          -->
        </v-col>
      </v-row>

      <v-btn type="submit" block tile large elevation="5" class="mt-2"
        >Speichern
      </v-btn>
      <v-card-text class="caption">name:{{ recipe.imageName }}</v-card-text>
      <v-card-text class="caption">src: {{ recipe.imageSrc }}</v-card-text>
      <v-card-text class="caption">src: {{ finishDialog }}</v-card-text>
      <v-dialog persistent v-model="finishDialog" max-width="25em">
        <v-card v-if="finishDialog">
          <v-card-title class="title">
            Willst du das Rezept <br />
            <div class="green--text">"{{ recipe.recipeName }}"</div>
            <br />
            speichern?
          </v-card-title>
          <v-card-subtitle>{{ recipe.createdBy.email }}</v-card-subtitle>
          <v-card-text>
            <p><b>Zutaten</b></p>
            <ul>
              <li v-for="(z, i) in recipe.ingredients" :key="i">
                {{ z.name }}
              </li>
            </ul>
            <p></p>
            <p><b>Anleitung</b>:</p>
            <ol>
              <li v-for="step in recipe.recipeDescription" :key="step.nr">
                {{ step.text }}
              </li>
            </ol>
            <p v-if="recipe.imageName">{{ recipe.imageName }}</p>
            <p v-else class="error font-weight-bold text-center">Kein Bild</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="finishDialog = false">
              Abrechen
            </v-btn>
            <v-btn color="success" text @click="saveFile">
              Speichern
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-form>
  </v-card>
</template>
<script>
import { timestamp, firestore, fireBucket } from "@/plugins/firebase";

export default {
  name: "RecipeForm",
  props: {
    recipeObject: Object,
    edit: Boolean
  },
  data: () => ({
    editMode: false,
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
    filled: [
      v => v != "" || "Feld darf nicht leer sein.",
      v => v != null || "Feld darf nicht NULL sein."
    ],
    finishDialog: false
  }),
  computed: {
    recipe: {
      get() {
        return this.recipeObject;
      },
      set(event) {
        this.$emit("input", event);
      },
      user() {
        return this.$store.getters.getUser;
      }
    }
  },
  beforeMount() {
    //this.recipe.createdBy = this.user;
    console.log("recipeForm:", this.recipeObject);
    if (this.edit) {
      this.editMode = this.edit;
    }
  },
  mounted() {
    console.log("recipeForm mounted: ", this.recipeObject);
  },
  methods: {
    deleteItem(item) {
      const z = this.recipe.ingredients[item];
      this.recipe.ingredients.splice(item, 1);
      firestore
        .collection("recipes")
        .doc(this.recipe.id)
        .update({
          ingredients: this.recipe.ingredients
        })
        .then(() => this.$toast("Zutat " + z.name + " gelöscht"));
      this.editItem = null;
    },

    addImageToRecipe(image) {
      console.log("add", image.downloadUrl);
      this.recipe.imageSrc = image.downloadUrl;
      this.image = image.downloadUrl;
      this.imageDialog = false;
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
            };
            storageRef
              .child(fullPath)
              .getMetadata()
              .then(meta => {
                image.imageSrc = meta.bucket;
              });
            storageRef
              .child(fullPath)
              .getDownloadURL()
              .then(url => {
                image.downloadUrl = url;
              });
            images.push(image);
          });
          this.imageGallery = images;
        })
        .then(() => {
          this.imageLoading = false;
        });
    },
    pickFile() {
      this.$refs.fileInput.click();
    },
    onFilePicked(event) {
      const files = event.target.files;
      const file = files[0];
      const validType = file.type == "image/jpeg" || file.type == "image/png";
      this.filename = file.name;
      if (!validType) {
        this.$toast.error("Dateiformat muss 'jpg' oder 'png' sein.");
        return;
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imgsrc = fileReader.result;
      });
      fileReader.readAsDataURL(file);
      this.image = file;
    },
    uploadImage() {
      this.imageLoading = true;
      fireBucket
        .ref("recipes/" + this.filename)
        .put(this.image)
        .then(fileData => {
          console.log("fileData: ", fileData); // 6. Bild wird gespeichert und als Objekt angelegt
          return fireBucket.ref("recipes/" + this.filename).getDownloadURL(); //7. Die URL des Bildes wird zurück gegeben
        })
        .then(URL => {
          console.log("hochgeladen", URL);
          this.recipe.imageSrc = URL;
          this.imgsrc = null;
          this.image = null;
          this.filename = "";
          return firestore
            .collection("recipes")
            .doc(this.recipe.id)
            .update({
              imageSrc: URL // 8. Die URL zum Bild wird im gerade erstellten Dokument gespeichert, welches anhand des keys gefunden wird
            })
            .then(() => (this.imageLoading = false));
        });
    },
    saveFile() {
      this.finishDialog = false;
      this.recipe.time = timestamp;
      console.log("Rezept wird gespeichert", this.recipe, this.recipe.time);
      this.$emit("saveRecipe", this.recipe);
    },
    addIngredient(event) {
      console.log(event);
      let tempNr = 0;
      this.recipe.ingredients.forEach(element => {
        if (tempNr < element.nr) {
          tempNr = element.nr;
        }
      });
      const newItem = {
        nr: tempNr + 1,
        menge: event.target.menge.value,
        name: event.target.name.value
      };

      console.log("add ingredient", newItem, "mit Nummer", tempNr);
      this.recipe.ingredients.push(newItem);
      this.$refs.zutatForm.reset();
    },
    addStep() {
      if (this.recipe.recipeDescription.length <= 9) {
        const x = { nr: this.recipe.recipeDescription.length + 1, text: "" };
        this.recipe.recipeDescription.push(x);
      }
    },
    addStepBetween(nr) {
      console.log("nr", nr);
      console.log("länge", this.recipe.recipeDescription.length);
      this.recipe.recipeDescription.splice(nr, 0, { nr: nr + 1, text: "" });
      for (let i = nr + 1; i < this.recipe.recipeDescription.length; i++) {
        console.log("bearbeiten ", i);
        this.recipe.recipeDescription[i].nr += 1;
      }
      console.log(this.recipe.recipeDescription[nr]);
    },
    deleteStep(n) {
      if (this.recipe.recipeDescription.length > 1) {
        this.recipe.recipeDescription.splice(n, 1);
      }
    },
    openD() {
      let saveR = {
        //ToDo: eingaben werden hier wieder gelöscht, dafür muss eine andere Möglichkeit beim Neu anlegen gefunden werden. Aber ich hab grad kein Bock drauf
        recipeName: this.recipe.recipeName,
        recipeDescription: this.recipe.recipeDescription,
        imageName: this.recipe.filename,
        imageSrc: this.recipe.imageSrc,
        ingredients: this.recipe.ingredients,
        createdBy: this.$store.getters.getUser
      };
      console.log(
        "openD",
        saveR,
        this.$refs.form.validate(),
        this.finishDialog
      );
      if (this.$refs.form.validate()) {
        this.finishDialog = true;
        this.$store.commit("loading", true);
      }
    }
  }
};
</script>

<style scoped></style>
