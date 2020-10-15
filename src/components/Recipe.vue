<template>
  <v-row>
    <v-col style="border: 0px solid;" cols="12">
      <v-card color="#dee8ef" class="my-2">
        <v-toolbar>
          <v-toolbar-items>
            <v-btn elevation="0" small @click="$emit('back')">
              <v-icon color="accent">mdi-arrow-left-bold</v-icon>
            </v-btn>
          </v-toolbar-items>
          <v-spacer></v-spacer>
          <template v-if="user">
            <v-btn icon @click="$emit('editRecipe', recipe)"><v-icon>mdi-pencil</v-icon></v-btn>
          </template>
        </v-toolbar>
        <v-card-title>{{ recipe.recipeName }}</v-card-title>
        <v-row>
          <v-col cols="12" sm="5" md="4">
            <v-list dense>
              <v-subheader>Zutaten</v-subheader>
              <v-list-item v-for="(i, x) in recipe.ingredients" :key="i + x">
                <v-list-item-icon
                  ><v-icon>mdi-hamburger</v-icon></v-list-item-icon
                >
                <v-list-item-content>
                  <v-list-item-title>{{ i }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
          <v-col cols="12" sm="7" md="8">
            <v-card-text class="headline">{{
              recipe.recipeDescription
            }}</v-card-text>
          </v-col>
        </v-row>
        <v-img
          :src="recipe.imageSrc"
          class="ma-0"
          max-height="300"
          cover
        ></v-img>
        <v-btn block text :href="recipe.imageSrc" target="_blank">{{
          recipe.imageName
        }}</v-btn>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Recipe",
  props: ["recipe"],
  data: () => ({}),
  methods: {},
  computed: {
    user() {
      return this.$store.getters.getUser;
    }
  }
};
</script>

<style scoped></style>
