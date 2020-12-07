<template>
  <v-row>
    <v-col cols="12">
      <v-card color="#dee8ef" class="my-0">
        <v-toolbar>
          <v-toolbar-items>
            <v-btn elevation="0" small @click="$emit('back')">
              <v-icon color="accent">mdi-arrow-left-bold</v-icon>
            </v-btn>
          </v-toolbar-items>
          <v-spacer></v-spacer>
          <template v-if="user">
            <v-btn icon @click="$emit('editRecipe', recipe)"
              ><v-icon>mdi-pencil</v-icon></v-btn
            >
          </template>
        </v-toolbar>
        <v-img
          :src="recipe.imageSrc"
          class="ma-0 rounded-0"
          height="18em"
          @click="overlay = !overlay"
          cover
        ></v-img>
        <v-row>
          <v-col cols="12" sm="12" md="12">
            <v-card
              class="px-2 mx-2 elevation-0"
              style="background-color: transparent; position: relative; top:-120px;"
            >
              <v-toolbar height="60px" color="transparent" elevation="0">
                <v-toolbar-title
                  class="text-h4 text-sm-h3 text-md-h2 text-lg-h1 white--text font-weight-bold"
                >
                  {{ recipe.recipeName }}
                </v-toolbar-title>
              </v-toolbar>
              <v-list dense class="rounded-lg elevation-4">
                <v-subheader>Zutaten</v-subheader>
                <v-list-item v-for="(i, x) in recipe.ingredients" :key="i + x">
                  <v-list-item-icon
                    ><v-icon>mdi-hand-pointing-right</v-icon></v-list-item-icon
                  >
                  <v-list-item-content>
                    <v-list-item-title>{{ i }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="12" sm="12" md="12">
            <div style="position: relative; top: -100px">
              <v-card
                class="elevation-0"
                tile
                color="white"
                v-for="(step,nr) in recipe.recipeDescription"
                :key="step.nr"
              >
                <v-toolbar
                  height="20px"
                  elevation="0"
                  color="white"
                  class="rounded-0"
                >
                  <div
                    class="body-2 grey--text darken-4"
                  >
                    Schritt {{ nr+1 }}
                  </div>
                </v-toolbar>
                <v-card-text>{{ step.text }} </v-card-text>
                <v-divider inset class="mx-16 pb-3"></v-divider>
              </v-card>
            </div>
          </v-col>
        </v-row>
        <v-overlay absolute :value="overlay" dark>
          <v-img
            :width="$vuetify.breakpoint.width"
            aspect-ratio="1.2"
            transition="scale-transition"
            :src="recipe.imageSrc"
            @click="overlay = false"
          ></v-img>
        </v-overlay>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Recipe",
  props: ["recipe"],
  data: () => ({
    overlay: false
  }),
  methods: {},
  computed: {
    user() {
      return this.$store.getters.getUser;
    }
  }
};
</script>

<style scoped></style>
