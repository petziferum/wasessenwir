<template>
  <v-row justify="center">
    <template v-if="user === null">
      <v-col cols="12" sm="6" md="4" lg="3" class="text-center">
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
      <v-col>
        <v-card class="my-2">
          <v-card-title> Save New Recipe </v-card-title>
          <v-card-subtitle>
            {{ user.email }}
          </v-card-subtitle>
          <v-card-actions>
            <v-row justify="center">
              <v-col cols="8">
                <v-form ref="form" @submit.prevent="openD">
                  <v-text-field
                    label="Rezept Name"
                    v-model="recipeName"
                    :rules="filled"
                  ></v-text-field>
                  <v-textarea
                    outlined
                    label="Beschreibung"
                    v-model="recipeDescription"
                    :rules="filled"
                  ></v-textarea>
                  <v-combobox
                    label="Zutaten"
                    :items="ingredientItems"
                    v-model="ingredients"
                    chips
                    outlined
                    multiple
                  ></v-combobox>
                  <v-row>
                    <v-col cols-12>
                      <v-btn outlined class="primary" @click="onPickFile" dark>
                        <v-icon left>mdi-camera-outline</v-icon>
                        Bild
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
                  <v-dialog persistent v-model="finishDialog" max-width="25em">
                    <v-card>
                      <v-card-title class="headline">
                        Willst du das Rezept <br />"{{ recipeName }}" <br />
                        speichern?
                      </v-card-title>
                      <v-card-text
                        ><p>
                          {{ recipeDescription }}
                        </p>
                        <p>{{ ingredients }}</p>
                        <p>{{ image }}</p>
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
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </template>
  </v-row>
</template>

<script>
import db from "@/plugins/firebase";
import * as firebase from "firebase";

export default {
  name: "SaveRecipe",
  data: () => ({
    recipeName: "",
    ingredients: [],
    ingredientItems: ["Hackfleisch", "Tomaten", "Salz", "Eier"],
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
    onPickFile() {
      this.$refs.fileInput.click();
    },
    openD() {
      if (this.$refs.form.validate()) {
        this.finishDialog = true;
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
      console.log("image: ", this.image);
      console.log("filename: ", this.filename);
      console.log("imgsrc: ", this.imgsrc);
      const file = this.image;
      console.log(file);

      let input = {
        recipeName: this.recipeName,
        recipeDescription: this.recipeDescription,
        imageName: this.filename,
        imageSrc: "",
        ingredients: this.ingredients,
        time: Date.now()
      };
      //const metadata = { contentType: "image/jpeg" }
      if (this.$refs.form.validate()) {
        db.collection("recipes") //1. Verbindung zur Cloud Datenbank, um Dokument anzulegen
          .add(input)
          .then(res => {
            let key = res.id; //2. Die ID des neuen Dokuments wird in "key" gespeichert
            console.log("key:", key);
            return key; //3. key wird weitergereicht
          })
          .then(key => {
            let ext = input.imageName.slice(input.imageName.lastIndexOf(".")); // 4. Dateiname wird erstellt
            console.log("ext", ext);
            return firebase // 5. Verbindung mit dem Firebase Storage wird hergestellt in dem Pfad "recipes/"
              .storage()
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
                return db
                  .collection("recipes")
                  .doc(key)
                  .update({
                    imageSrc: URL // 8. Die URL zum Bild wird im gerade erstellten Dokument gespeichert, welches anhand des keys gefunden wird
                  })
                  .then(() => {
                    console.log("Dokument" + key + "aktuallisiert mit " + URL);
                  });
              })
              .catch(error => {
                console.error("Fehler: ", error);
              });
          })
          .then(() => {
            this.finishDialog = false;
            this.$refs.form.reset();
            this.$router.push("/");
          })
          .finally(() => {
            this.$store.dispatch("getRecipes");
          });
      }
    },
    sendInput() {
      let input = {
        name: this.recipeName,
        imageName: this.filename,
        time: Date.now()
      };
      let imgsrc;
      let key;
      let ext;
      db.collection("recipes")
        .doc("recipe-" + this.recipeName)
        .set(input)
        .then(data => {
          console.info(data.data.key);
          key = data.data.key;
          return key;
        })
        .then(key => {
          const filename = this.image.name;
          ext = filename.slice(filename.lastIndexOf("."));
          return firebase
            .storage()
            .ref("recipes/" + key + ext)
            .put(this.image);
        })
        .then(URL => {
          imgsrc = URL;
          console.log(imgsrc);
          return db
            .collection("recipes")
            .child(key)
            .update({ imgsrc: imgsrc });
        })
        .then(() => {
          this.savedRecipe = {
            id: key,
            link: "recipe/" + key,
            imgsrc: imgsrc,
            ...input
          };
        })
        .catch(error => {
          console.log(error);
        });
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
  computed: {
    user() {
      return this.$store.getters.getUser;
    }
  },
  mounted() {}
};
</script>

<style scoped></style>
