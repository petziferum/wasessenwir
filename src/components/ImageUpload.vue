<template>
  <v-container fluid>
    <v-row style="border: 1px  solid;">
      <v-col cols="2" >
        <v-hover v-slot="{ hover }">
          <v-btn :elevation="hover ? 6 : 1" @click="onPickFile"
          >Datei <br />auswählen</v-btn
          ></v-hover
        >
      </v-col>
      <v-col cols="3">
        <input
            class="caption ma-2"
            v-show="false"
            contenteditable="false"
            type="file"
            prepend-icon="mdi-camera"
            ref="fileInput"
            @change="onFilePicked"
        />
        <template v-if="image">
          <v-row >
            <v-col cols="12">
              <div height="100px">
                <v-img style="border:1px solid grey;" aspect-ratio="1" max-width="100px" contain :src="imgsrc"></v-img>
              </div>
              <span class="caption">{{ filename }}</span>
              <div>
                <v-btn @click="uploadImage">Upload</v-btn>
              </div>
            </v-col>
          </v-row>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import * as firebase from "firebase";

export default {
  name: "ImageUpload",
  data() {
    return {
      image: null,
      imgsrc: null,
      filename: ""
    };
  },
  methods: {
    onPickFile() {
      this.$refs.fileInput.click();
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
    },
    uploadImage() {
      firebase // 5. Verbindung mit dem Firebase Storage wird hergestellt in dem Pfad "recipes/"
        .storage()
        .ref("recipes/" + this.filename)
        .put(this.image)
        .then(fileData => {
          console.log("fileData: ", fileData); // 6. Bild wird gespeichert und als Objekt angelegt
          return firebase
            .storage()
            .ref("recipes/" + this.filename)
            .getDownloadURL(); //7. Die URL des Bildes wird zurück gegeben
        })
        .then(URL => {
          console.log("hochgeladen", URL);
          this.imgsrc = URL;
          this.$emit("uploaded", URL)
          this.image = null;
          this.imgsrc = null;
          this.filename = ""
          /*return db
            .collection("recipes")
            .doc(key)
            .update({
              imageSrc: URL // 8. Die URL zum Bild wird im gerade erstellten Dokument gespeichert, welches anhand des keys gefunden wird
            });*/
        });
    }
  }
};
</script>

<style scoped></style>
