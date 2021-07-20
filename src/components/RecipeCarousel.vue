<template>
  <v-carousel
    v-model="model"
    :cycle="false"
    progress
    progress-color="white"
    delimiter-icon="mdi-hamburger"
    :height="windowHeight"
    style="margin-bottom: 0; padding-bottom: 0;"
  >
    <v-carousel-item v-for="(step, i) in steps" :key="i">
      <v-sheet class="display-3" color="transparent">
        <template v-if="i == 0">
          <v-row>
            <v-col class="pt-7 text text-center" cols="12">
              Zutaten
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="6">
              <v-list color="white">
                <v-list-item v-for="(z, x) in step" :key="x">
                  <v-list-item-content>
                    <v-list-item-title class="body-1 text"
                      >{{ z.menge }} - {{ z.name }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </template>
        <template v-else>
          <v-row
            justify="center"
            align-content="center"
            style="position: absolute; height: 100%; width:100%;"
          >
            <v-col cols="8">
              <div class="text">
                {{ step.text }}
              </div>
            </v-col>
          </v-row>
        </template>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  name: "Recipe",
  props: [
    "recipe"
  ],
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
      return (document.defaultView.innerHeight / 2)+55;
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
  font-weight: bold;
  font-size: 16pt;
  line-height: 20pt;
}
</style>
