<template>
  <v-container>
    <v-carousel v-model="model" max-height="50em" mandatory>
      <v-carousel-item v-for="(step, i) in steps" :key="i">
        <v-sheet class="display-3" color="transparent">
          <v-row justify="center" align="center" class="">
            <template v-if="i == 0">
              <div>
                Zutaten:
                <v-list color="transparent">
                  <v-list-item v-for="(z, x) in step" :key="x">
                    <v-list-item-content>
                      <v-list-item-title class="display-1"
                        >{{ z.menge }} - {{ z.name }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </div>
            </template>
            <template v-else>
              <div>
                {{ step.text }}
              </div>
            </template>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </v-container>
</template>

<script>
import { firestore } from "@/plugins/firebase";

export default {
  name: "Recipe",
  data() {
    return {
      recipeId: this.$route.params.recipe_id,
      recipe: null,
      steps: [{}],
      model: 0
    };
  },

  methods: {
    getRecipe() {
      let recipeRef = firestore.collection("recipes").doc(this.recipeId);

      recipeRef
        .get()
        .then(doc => {
          let r = doc.data();
          this.recipe = r;
          console.info("fertig");
        })
        .then(() => {
          this.steps[0] = this.recipe.ingredients;
          for (let s of this.recipe.recipeDescription) {
            this.steps.push(s);
          }
          console.log(this.steps.length);
          this.steps[this.steps.length] = { text: "Ende" };
        });
    },
    updateId() {
      console.log("aufgerufen", this.$route.params.recipe_id);
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
    this.getRecipe();
  }
};
</script>

<style scoped></style>
