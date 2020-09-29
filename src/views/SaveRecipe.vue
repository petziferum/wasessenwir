<template>
  <v-row>
    <v-col>
      <v-card class="my-2">
        <v-card-title>
          Save New Recipe
        </v-card-title>
        <v-card-subtitle>
          {{ user.email }}
        </v-card-subtitle>
        <v-card-actions>
          <v-row justify="center">
            <v-col cols="8">
              <v-form ref="form" @submit.prevent="saveFile">
                <v-text-field
                  label="Rezept Name"
                  v-model="recipeName"
                ></v-text-field>
                <v-textarea outlined  label="Beschreibung" v-model="recipeDescription"></v-textarea>
                <v-combobox label="Zutaten" :items="ingredientItems" v-model="ingredients" multiple></v-combobox>
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
                <v-btn block tile large elevation="5" type="submit"
                  >Speichern
                </v-btn>
              </v-form>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
      {{ image }}
    </v-col>
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
    recipeDescription:"",
    imgsrc: "",
    image: null,
    filename: null,
    user: null,
    savedRecipe: null
  }),
  methods: {
    onPickFile() {
      this.$refs.fileInput.click();
    },
    logIn() {
      firebase
        .auth()
        .signInWithEmailAndPassword("test@test.de", "testtest")
        .then(res => {
          this.user = res.user;
          console.log("eingeloggt", this.user.email);
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
        });
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
  computed: {},
  mounted() {
    this.logIn();
  }
};
</script>

<style scoped></style>
