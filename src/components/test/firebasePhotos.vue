<template>
  <v-card class="slide-fade">
    <v-card-title>Rezepte Bearbeiten</v-card-title>
    <v-card-subtitle>
      <v-spacer />
      <v-btn small @click="fetchFotos">holen</v-btn>
      edit: {{ edit }}
    </v-card-subtitle>
    <v-card-text class="slide-fade">
      <transition name="slide-fade" mode="out-in">
        <template v-if="!editRecipe || loading">
          <v-skeleton-loader
            type="list-item-avatar-three-line"
          ></v-skeleton-loader>
        </template>
        <template v-else>
          <v-list key="listkey1">
            <v-list-item
              v-for="(step, i) in editRecipe.recipeDescription"
              :key="step.nr"
            >
              <v-list-item-avatar
                v-if="step.img !== undefined"
                tile
                width="100"
                height="80"
              >
                <v-img :src="step.img" />
              </v-list-item-avatar>
              <v-list-item-title>
                <div v-if="edit !== i">{{ i }} {{ step.text }}</div>
                <v-text-field
                  v-else
                  label="Beschreibung"
                  v-model="step.text"
                ></v-text-field>
              </v-list-item-title>
              <v-list-item-action>
                <v-btn v-if="edit !== i" @click="enterEditMode(i)" fab small
                  >edit</v-btn
                >
                <template v-else>
                  <v-btn @click="saveEditedStep(step)">Save</v-btn>
                  <v-btn @click="edit = null">cancel</v-btn>
                </template>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </template>
      </transition>
    </v-card-text>
  </v-card>
</template>

<script>
import firebase from "@/plugins/firebase";

export default {
  name: "firebasePhotos",
  data: () => ({
    recipeId: "4WfY2bCkSW08xcfp3OCD",
    editRecipe: null,
    recipeOrigin: null,
    edit: null,
    stepToEdit: null,
    loading: false
  }),
  methods: {
    fetchFotos() {
      this.loading = true;
      setTimeout(() => {
        var storage = firebase.storage();
        var ref = storage.ref();
        var store = firebase.firestore().collection("recipes");
        var images = ref.child("images");
        console.log(images);
        store
          .doc(this.recipeId)
          .get()
          .then(res => {
            ref
              .child("recipes")
              .listAll()
              .then(list => {
                console.log("list", list);
                this.editRecipe = res.data();
                this.recipeOrigin = res.data();
                this.loading = false;
              });
          });
      }, 1000);
    },

    enterEditMode(i) {
      this.edit = i;
      console.log("edit ", i);
    },

    saveEditedStep(step) {
      this.loading = true;
      this.editRecipe.recipeDescription[step] = this.stepToEdit;
      var store = firebase.firestore().collection("recipes");
      store
        .doc(this.editRecipe.id)
        .update({
          recipeDescription: this.editRecipe.recipeDescription
        })
        .then(() => {
          this.editRecipe = null;
          this.fetchFotos();
          this.edit = null;
          this.loading = false;
        });
    }
  }
};
</script>

<style scoped>
.slide-fade {
  transition: all 1s ease;
}
.slide-fade-enter-active {
  opacity: 0;
  transform: translateY(-50px);
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from {
  transform: translateX(100px);
  opacity: 0;
}
.slide-fade-enter-to {
  transform: translateX(0);
  opacity: 1;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-leave-to {
  transform: translateX(100px);
  opacity: 0;
}
</style>
