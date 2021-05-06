<template>
  <v-row justify="center">
    <template v-if="user === null">
      <v-col cols="12" sm="6" md="4" lg="3" xl="3" class="text-center">
        <v-card>
          <v-card-title>Login</v-card-title>
          <v-card-text>
            <v-form ref="loginForm" @submit.prevent="logIn">
              <v-text-field
                label="Password"
                type="password"
                v-model="password"
              ></v-text-field>
              <v-card-text style="color:#ff0000" v-if="errorMessage.state">{{
                errorMessage.text
              }}</v-card-text
              ><br />
              <v-card-actions>
                <v-btn type="submit">Login</v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </template>
    <template v-else>
      <v-col cols="12">
        <v-card tile class="my-2">
          <v-card-title> Save New Recipe </v-card-title>
          <v-card-subtitle>
            {{ user.email }}
          </v-card-subtitle>
          <v-card-actions>
            <v-row no-gutters justify="center">
              <v-col cols="12">
                <v-card flat class="ma-0 pa-1">
                  <v-form ref="form" @submit.prevent="openD">
                    <v-text-field
                      label="Rezept Name"
                      v-model="recipeName"
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
                              <template v-for="(item, i) in ingredients">
                                <v-divider
                                  v-if="i !== 0"
                                  :key="`${i}-divider`"
                                ></v-divider>
                                <v-list-item class="slide" :key="item.nr">
                                  <v-list-item-title>
                                    <v-row>
                                      <v-col cols="3">
                                        {{ item.menge }}
                                      </v-col>
                                      <v-col cols="9">
                                        <template v-if="i == editItem">
                                          <v-form ref="editIngredient" @submit.prevent="editItem=null">
                                          <v-text-field label="Name" v-model="ingredients[i].name"  @click:append.prevent="editItem=null" append-icon="mdi-content-save"></v-text-field>
                                          </v-form>
                                        </template>
                                        <template v-else>
                                          {{item.name}}{{i}}<div class="float-right"><v-btn x-small @click="editItem = i">edit</v-btn></div>
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
                          <v-form
                            @submit.prevent="addIngredient"
                            ref="zutatForm"
                          >
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
                      <template v-for="(step, i) in steps">
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
                        <v-btn
                          outlined
                          class="primary"
                          @click="onPickFile"
                          dark
                        >
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
                      </v-col>
                    </v-row>

                    <v-btn type="submit" block tile large elevation="5"
                      >Speichern
                    </v-btn>
                    <v-dialog
                      persistent
                      v-if="savedRecipe"
                      v-model="finishDialog"
                      max-width="25em"
                    >
                      <v-card>
                        <v-card-title class="headline">
                          Willst du das Rezept <br />"{{
                            savedRecipe.recipeName
                          }}" <br />
                          speichern?
                        </v-card-title>
                        <v-card-text
                          ><p
                            v-for="step in savedRecipe.recipeDescription"
                            :key="step.nr"
                          >
                            {{ step.text }}
                          </p>
                          <p>{{ savedRecipe.ingredients }}</p>
                          <p>{{ savedRecipe.filename }}</p>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="green darken-1"
                            text
                            @click="finishDialog = false"
                          >
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
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-row justify="center">
        <v-col cols="10">
          Rezepte:<br />
          <v-btn @click="getonlinerecipes">online rezepte</v-btn>
          <v-list three-line>
            <v-list-item
              v-for="r in onlineRecipes"
              :key="r.nameId"
              link
              :to="'/edit/' + r.id"
            >
              <v-list-item-avatar>
                <v-img :src="r.imageSrc"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ r.recipeName }}</v-list-item-title>
                <v-list-item-subtitle
                  >ingredients: {{ r.ingredients }}</v-list-item-subtitle
                >
                <v-list-item-subtitle
                  >description: {{ r.recipeDescription }}</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </template>
  </v-row>
</template>

<script>
import { firestore, fireBucket } from "@/plugins/firebase";
import * as firebase from "firebase";

export default {
  name: "SaveRecipe",
  data: () => ({
    recipeName: "",
    ingredients: [],
    editItem: null,
    steps: [{ nr: 1, text: "" }],
    ingredientItems: [
      { nr: 1, name: "Zutat 1" },
      { nr: 2, name: "Hackfleisch" },
      { nr: 3, name: "Tomaten" },
      { nr: 3, name: "Eier" }
    ],
    recipeDescription: "",
    imgsrc: "",
    password: "",
    image: null,
    filename: null,
    savedRecipe: null,
    errorMessage: { state: true, text: "" },
    filled: [v => v != "" || "Field must not be empty"],
    finishDialog: false
  }),
  methods: {
    getonlinerecipes() {
      this.$store.dispatch("getRecipes");
    },
    addIngredient(event) {
      console.log(event);
      const newItem = {
        nr: this.ingredients.length + 1,
        menge: event.target.menge.value,
        name: event.target.name.value
      };

      console.log("add ingredient", newItem);
      this.ingredients.push(newItem);
      this.$refs.zutatForm.reset();
    },
    saveIngredient(event,nr){
      this.ingredients[nr] = event.target.name.value
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
        recipeName: this.recipeName,
        recipeDescription: this.steps,
        imageName: this.filename,
        imageSrc: "",
        ingredients: this.ingredients,
        createdBy: this.user,
        time: Date.now()
      };

      if (this.$refs.form.validate()) {
        this.savedRecipe = saveR;
        this.finishDialog = true;
        this.$store.commit("loading", true);
      }
    },
    logIn() {
      firebase
        .auth()
        .signInWithEmailAndPassword("test@test.de", this.password) //testtest
        .then(res => {
          this.$store.state.user = res.user;
          console.log("eingeloggt", res);
        })
        .catch(error => {
          this.errorMessage.state = true;
          this.errorMessage.text = error;
          console.error("fehler", error);
        })
        .finally(() => {
          this.$refs.loginForm.reset();
        });
    },
    saveFile() {
      this.finishDialog = false;
      const file = this.image;
      let input = this.savedRecipe;
      //const metadata = { contentType: "image/jpeg" }
      if (this.$refs.form.validate()) {
        firestore
          .collection("recipes") //1. Verbindung zur Cloud Datenbank, um Dokument anzulegen
          .add(input)
          .then(res => {
            let key = res.id; //2. Die ID des neuen Dokuments wird in "key" gespeichert
            return key; //3. key wird weitergereicht
          })
          .then(key => {
            let ext = input.imageName.slice(input.imageName.lastIndexOf(".")); // 4. Dateiname wird erstellt
            return fireBucket // 5. Verbindung mit dem Firebase Storage wird hergestellt in dem Pfad "recipes/"
              .ref("recipes/" + key + ext)
              .put(file)
              .then(fileData => {
                console.log("fileData: ", fileData); // 6. Bild wird gespeichert und als Objekt angelegt
                return firebase
                  .storage()
                  .ref("recipes/" + key + ext)
                  .getDownloadURL(); //7. Die URL des Bildes wird zurück gegeben
              })
              .then(URL => {
                console.log("hochgeladen", URL);
                this.imgsrc = URL;
                return firestore
                  .collection("recipes")
                  .doc(key)
                  .update({
                    imageSrc: URL // 8. Die URL zum Bild wird im gerade erstellten Dokument gespeichert, welches anhand des keys gefunden wird
                  });
              })
              .catch(error => {
                console.error("Fehler im update: ", error);
              });
          })
          .then(() => {
            this.finishDialog = false;
            this.$refs.form.reset();
            this.$router.push("/");
          })
          .catch(err => {
            console.log("fehler am ende", err);
          })
          .finally(() => {
            this.$store.dispatch("getRecipes");
          });
      }
    },
    onFilePicked(event) {
      const files = event.target.files;
      this.filename = files[0].name;
      if (this.filename.lastIndexOf(".png") <= 0) {
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
  computed: {
    onlineRecipes() {
      return this.$store.getters.getRecipes;
    },
    loading() {
      return this.$store.getters.loading;
    },
    user() {
      return this.$store.getters.getUser;
    }
  },
  beforeMount() {
    this.$store.dispatch("getRecipes")
  }
};
</script>

<style>
.stepsheet {
  background-color: blanchedalmond;
}
.slide-enter-active {
  animation: slide-in ease-in-out 3s;
}
.slide-enter {
  height: 0;
  transform: rotateX(24deg);
}
.slide {
}
.textfieldappear {
  width: 300px;
  fill: khaki;
}
.textfields {
  display: inline-block;
  margin: 0px;
}
.listitem {
  postition: absolut;
  background-color: indigo;
  color: wheat;
  width: 50%;
}
@keyframes slide-in {
  0% {
    transform: translateX(450px) translateY(-30px) scale(0.6);
    opacity: 0.1;
  }
  30% {
    opacity: 0.4;
    transform: scale(2) translateX(50px);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: translateX(0) scaleY(1);
    opacity: 1;
  }
}
</style>
