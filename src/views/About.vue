<template>
  <v-container>
    <v-card outlined>
      <v-app-bar
        flat
        color="#6A76AB"
        light
        height="200"
        shrink-on-scroll
        class="bg"
        :src="require('@/assets/iso-house.png')"
        fade-img-on-scroll
      >
        <v-card-title>Lass den Zufall entscheiden!</v-card-title>
      </v-app-bar>
      <v-card-actions>
        <v-btn @click="getFrage">Eine Karte ziehen!</v-btn>
        <v-btn @click="getMeal">getMeal</v-btn>
      </v-card-actions>
      <v-container>
        <v-row justify="center">
          <v-scale-transition group>
            <template v-for="(f, i) in meals">
              <v-card width="200px" class="float-left ma-1" :key="`${i}-key`">
                <v-toolbar height="40px" dense flat color="accent">
                  {{ f._id }} {{ f.name }}
                </v-toolbar>
                <v-card-subtitle class="caption py-2">
                  {{ f.description }}
                </v-card-subtitle>
                <v-card-text class="caption">
                  Zutaten:
                  <v-row no-gutters>
                    <v-col
                      cols="3"
                      class="pa-0"
                      v-for="i in f.ingredients"
                      :key="i.id"
                    >
                      <v-chip class="pa-1" small pill>{{ i }}</v-chip>
                    </v-col>
                  </v-row>
                  <v-divider></v-divider>
                  Schwierigkeit: {{ f.level }}
                </v-card-text>
              </v-card>
            </template>
          </v-scale-transition>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>
<script>
export default {
  name: "About-Component",
  data: () => ({}),
  methods: {
    getFrage() {
      this.$store.dispatch("createQuestion");
    },
    getMeal() {
      this.$store.dispatch("setMeal");
    }
  },
  computed: {
    frage() {
      return this.$store.getters.getQuestions;
    },
    meals() {
      return this.$store.getters.getMeals;
    }
  }
};
</script>
<style>
.bg {
  background-size: contain;
}
</style>
