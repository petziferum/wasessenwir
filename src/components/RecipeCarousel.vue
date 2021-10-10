<template>
  <v-carousel
    v-model="model"
    :cycle="false"
    progress
    progress-color="white"
    delimiter-icon="mdi-hamburger"
    :height="windowHeight"
    style="margin:0; padding-bottom:100px;"
  >
    <v-carousel-item v-for="(step, i) in steps" :key="i">
      <v-sheet class="display-3" color="transparent">
        <template v-if="i == 0">
          <v-img :src="recipe.imageSrc" :height="windowHeight">
            <v-row>
              <v-col class="pt-7 text-h5 text-center" cols="12">
                Zutaten
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col cols="8" md="6" lg="4">
                <v-list color="white" dense>
                  <v-list-item-group>
                    <v-list-item v-for="(z, x) in step" :key="x">
                      <v-list-item-content>
                        <v-list-item-title class="text"
                          >{{ z.menge }} - {{ z.name }}
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-col>
            </v-row>
          </v-img>
        </template>
        <template v-else>
          <v-sheet light :height="windowHeight" color="transparent">
            <v-row
              justify="center"
              align-content="center"
              style="position: relative; height: 100%; width:100%;"
            >
              <v-col cols="8">
                <v-card light min-height="250px">
                  <v-card-title>Schritt {{ i }}.</v-card-title>
                  <v-card-text v-html="step.text"> </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-sheet>
        </template>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  name: "Recipe",
  props: ["recipe"],
  data() {
    return {
      recipeId: this.$route.params.recipe_id,
      steps: [],
      model: 0
    };
  },

  methods: {
    loadSteps() {
      this.steps[0] = this.recipe.ingredients;
      for (let s of this.recipe.recipeDescription) {
        this.steps.push(s);
      }
      this.steps[this.steps.length] = { text: "Ende" };
    }
  },

  computed: {
    windowHeight() {
      return document.defaultView.innerHeight - 200;
    },
    user() {
      return this.$store.getters.getUser;
    }
  },
  mounted() {
    this.loadSteps();
  }
};
</script>

<style scoped>
.text {
  color: #505050;
  text-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);
  font-weight: normal;
  font-size: 13pt !important;
}
</style>
