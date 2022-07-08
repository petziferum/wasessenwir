<template>
  <v-card>
    <v-card-title>Fotos</v-card-title>
    <v-card-subtitle>
      <v-spacer />
      <v-btn small @click="fetchFotos">holen</v-btn>
    </v-card-subtitle>
    <v-card-text>
      <v-list v-if="editRecipe">
        <v-list-item v-for="step in editRecipe.recipeDescription" :key="step.nr">
          <v-list-item-avatar v-if="step.img != undefined" tile width="100" height="80">
            <v-img :src="step.img" />
          </v-list-item-avatar>
          <v-list-item-title>{{ step.text }}</v-list-item-title>
          <v-list-item-action>
            <v-btn fab small>add</v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <div>noch nicht geladen...</div>
    </v-card-text>
  </v-card>
</template>

<script>
import firebase from "@/plugins/firebase";

export default {
  name: "firebasePhotos",
  data: () => ({
    recipe: "4WfY2bCkSW08xcfp3OCD",
    editRecipe: null
  }),
  methods: {
    fetchFotos() {
      var storage = firebase.storage();
      var ref = storage.ref();
      var store = firebase.firestore().collection("recipes");
      var images = ref.child("images");
      console.log(images);
      store
        .doc(this.recipe)
        .get()
        .then(res => {
          ref
            .child("recipes")
            .listAll()
            .then(list => {
              console.log("list", list);
              this.editRecipe = res.data();
            });
        });
    }
  },
  computed: {}
};
</script>

<style scoped></style>
