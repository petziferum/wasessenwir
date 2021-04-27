<template>
  <v-container>
    <v-row>
      <v-col cols="12"> Rezept: {{ recipeId }},{{ user }} </v-col>
      <v-col cols="12">{{ recipe }}</v-col>
    </v-row>
  </v-container>
</template>

<script>
import { firestore} from "@/plugins/firebase";

export default {
  name: "Recipe",
  data() {
    return {
      recipeId: this.$route.params.recipe_id,
      recipe: null,
    };
  },

  methods: {
    getRecipe() {
      let recipeRef = firestore.collection("recipes").doc(this.recipeId);

      recipeRef.get().then((doc) => {
        let r = doc.data()
        this.recipe=r;
        console.info("fertig")
      })
    },
    updateId() {
      console.log("aufgerufen", this.$route.params.recipe_id)
      this.recipeId = this.$route.params.recipe_id;
    }
  },
  watch: {
    $route: "updateId"
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    }
  },
  beforeMount() {
    this.getRecipe()
  }
};
</script>

<style scoped></style>
