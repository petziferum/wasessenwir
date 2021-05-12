<template>
    <v-carousel v-model="model" :cycle="false" :height="ih" style="margin-bottom: 0; padding-bottom: 0;">
      <v-carousel-item v-for="(step, i) in steps" :key="i">
        <v-sheet class="display-3" color="transparent">
            <template v-if="i == 0">
              <v-row >
                <v-col class="pt-7 text text-center" cols="12">
                  Zutaten: {{ih}}
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="6">
                  <v-list color="transparent">
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
              <v-row justify="center" align-content="center" style="position: absolute; height: 100%; width:100%;">
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
ih(){
  return document.defaultView.innerHeight -260;
},
    user() {
      return this.$store.getters.getUser;
    }
  },
  beforeMount() {
    this.getRecipe();
  }
};
</script>

<style scoped>
.text{
  color:#505050;
  text-shadow: 3px 3px 3px rgba(0,0,0,0.3);
  font-weight: bold;
  font-size: 16pt;
  line-height: 20pt;
}
</style>
