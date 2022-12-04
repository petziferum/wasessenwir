<template>
  <v-row no-gutters>
    <v-col cols="12" class="pa-0">
      <v-toolbar height="100%" dense>
        <v-btn color="primary" @click="$router.back()">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <div v-if="loading" class="mx-auto headline">
          <v-skeleton-loader type="sentences" width="450"></v-skeleton-loader>
        </div>
        <div v-else class="mx-auto headline">
          <span v-if="activeRecipe != null">{{ activeRecipe.recipeName }}</span>
          <div v-if="editMode && storeUser">
            created by User: {{ storeUser.firstName }} {{ storeUser.lastName }}
          </div>
        </div>
        <v-btn icon>
          <v-icon @click="editMode = !editMode">mdi-pencil</v-icon>
        </v-btn>
      </v-toolbar>
      <v-row no-gutters justify="center">
        <v-col cols="12" md="6" lg="4">
          <v-skeleton-loader
            v-if="loading"
            class="mt-10"
            type="image, article, article, actions"
          ></v-skeleton-loader>
        </v-col>
        <v-col cols="12" v-if="!loading" class="pa-0 ma-0">
          <view-recipe-site v-if="activeRecipe != null" :edit="editMode" :activerecipe="activeRecipe" />
        </v-col>
        <v-col v-else><v-icon x-large>mdi-loading mdi-spin</v-icon></v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import ViewRecipeSite from "@/components/recipeviewcomponents/ViewRecipeSite";
import { firestore } from "@/plugins/firebase";

export default {
  name: "RecipeView",
  components: {
    ViewRecipeSite
  },
  props: ["title"],

  data() {
    return {
      recipeId: this.$route.params.recipe_id,
      editMode: false,
      user: null
    };
  },
  methods: {
    loadRecipe() {
      this.$store.dispatch("loadSingleRecipe", this.recipeId).then(() => {
        if(this.activeRecipe != null) {
          this.loadUser(this.activeRecipe.createdBy);
        }
      });
    },

    enterEditMode() {
      this.editMode = true;
    },

    loadUser(user) {
      console.log("user: ", user);
      const userRef = firestore.collection("users");
      userRef
        .where("id", "==", user.id)
        .get()
        .then(userSnap => {
          userSnap.forEach(user => {
            this.user = user.data();
          });
        });
    },

    updateId() {
      this.recipeId = this.$route.params.recipe_id;
      console.log("aufgerufen", this.$route.params.recipe_id);
    }
  },
  computed: {
    storeUser() {
      return this.$store.getters.getUser;
    },

    loading() {
      return this.$store.state.loading;
    },
    activeRecipe() {
      return this.$store.getters.getActiveRecipe;
    }
  },
  watch: {
    $route: "updateId"
  },
  mounted() {
    this.loadRecipe();
  }
};
</script>
<style></style>
