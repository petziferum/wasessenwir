<template>
  <v-container fluid>
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
      <v-row justify="center">
        <v-col cols="11" md="8" lg="6">
          <v-card tile class="my-2">
            <v-card-title> Save New Recipe </v-card-title>
            <v-card-subtitle>
              {{ user.email }}
            </v-card-subtitle>
            <v-card-actions>
              <v-row no-gutters justify="center">
                <v-col cols="12">
                  <RecipeForm
                    :edit="true"
                    :recipe="newRecipe"
                    v-on:saveRecipe="saveFile"
                  ></RecipeForm>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="11" md="8" lg="6">
          Rezepte:<br />
          <v-btn @click="getonlinerecipes">Online rezepte</v-btn>
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

                <v-list-item-subtitle>
                  <v-chip-group>
                    <v-chip x-small v-for="(z, i) in r.ingredients" :key="i">
                      {{ z.name }}
                    </v-chip>
                  </v-chip-group>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<script>
import { firestore, fireBucket } from "@/plugins/firebase";
import * as firebase from "firebase";
import RecipeForm from "@/components/RecipeForm";
export default {
  name: "SaveRecipe",
  components: { RecipeForm },
  data: () => ({
    newRecipe: {
      createdBy: null,
      ingredients: [],
      recipeDescription: [{ nr: 1, text: "" }],
      recipeName: null,
      time: null
    },

    ingredientItems: [
      { nr: 1, name: "Zutat 1" },
      { nr: 2, name: "Hackfleisch" },
      { nr: 3, name: "Tomaten" },
      { nr: 3, name: "Eier" }
    ],
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
    saveFile(emittedRecipe) {
      const recipeClear = {
        createdBy: null,
        ingredients: [],
        recipeDescription: [{ nr: 1, text: "" }],
        recipeName: null,
        time: null
      };
      this.newRecipe = recipeClear;
      this.finishDialog = false;

      let input = emittedRecipe;
      console.log("emittedRecipe", emittedRecipe);
      //const metadata = { contentType: "image/jpeg" }

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
            .put(input.imageSrc)
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
    this.$store.dispatch("getRecipes");
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
