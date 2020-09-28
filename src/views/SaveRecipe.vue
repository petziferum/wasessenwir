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
        <v-form ref="form" @submit.prevent="saveFile">
          <v-text-field label="Rezept Name" v-model="recipeName"></v-text-field>
          <v-row>
            <v-col cols-12>
              <v-btn outlined class="primary" @click="onPickFile" dark
                ><v-icon left>mdi-camera-outline</v-icon> Image</v-btn
              >
              <input
                class="caption ma-2"
                v-show="false"
                contenteditable="false"
                type="file"
                prepend-icon="mdi-camera"
                ref="fileInput"
                @change="onFilePicked"
              />
              <span v-if="image"> {{ filename }}</span
              ><v-btn text>X</v-btn>
            </v-col>
          </v-row>
          <v-btn block tile large elevation="5" type="submit">Speichern</v-btn>
        </v-form>
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
        imageName: this.filename,
        time: Date.now()
      };
      //const metadata = { contentType: "image/jpeg" }
      db.collection("recipes")
        .add(input)
        .then(res => {
          let key = res.id;
          console.log("key:", key);
          return key;
        })
        .then(key => {
          let ext = input.imageName.slice(input.imageName.lastIndexOf("."));
          console.log("ext", ext)
          return firebase
            .storage()
            .ref("recipes/" + key + ext)
            .put(file)
            .then(URL => {
              console.log("hochgeladen", URL);
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
