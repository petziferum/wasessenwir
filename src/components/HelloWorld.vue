<template>
  <v-row no-gutters>
    <v-col cols="12" class="pa-0">
      <v-toolbar height="100%" dense>
        <v-btn color="primary" @click="$router.back()">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <div class="mx-auto display-1" color="black">
          {{ activeRecipe.recipeName }}
        </div>
      </v-toolbar>
      <v-row no-gutters>
        <v-col cols="12">
          <v-skeleton-loader
            v-if="loading"
            class="mt-10"
            type="article, actions"
          ></v-skeleton-loader>
        </v-col>
        <v-col cols="12" v-if="!loading" class="pa-0 ma-0">
          <recipe-carousel :recipe="activeRecipe"></recipe-carousel>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import RecipeCarousel from "@/components/RecipeCarousel";
export default {
  name: "HelloWorld",
  components: {
    RecipeCarousel
  },
  props: ["title"],

  data() {
    return {
      recipeId: this.$route.params.recipe_id
    };
  },
  methods: {
    loadRecipe() {
      this.$store.dispatch("loadSingleRecipe", this.recipeId);
    },
    updateId() {
      this.recipeId = this.$route.params.recipe_id;
      console.log("aufgerufen", this.$route.params.recipe_id);
    }
  },
  computed: {
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
