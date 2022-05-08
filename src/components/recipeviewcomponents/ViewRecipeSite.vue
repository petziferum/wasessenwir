<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" md="6" lg="4">
        <v-card>
          <v-img :src="activerecipe.imageSrc" width="100%" height="250"></v-img>
          <v-card-text style="position: relative;">
            <v-card
              style="position: relative; top:-50px;margin-left:5px; margin-right: 5px;"
              elevation="10"
            >
              <v-list>
                <v-list-item v-for="z in activerecipe.ingredients" :key="z.nr">
                  <v-list-item-title>
                    <span v-if="z.menge">{{ z.menge }} - </span>
                    <span v-else> - - </span>{{ z.name }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card>
          </v-card-text>
          <v-divider />
          <v-card-text
            v-for="text in activerecipe.recipeDescription"
            :key="text.nr"
            class="text-body-1"
          >
            <v-row>
              <v-col cols="1">{{ text.nr }}.</v-col>
              <v-col cols="10">{{ text.text }}</v-col>
              <v-col cols="1">
                <template v-if="edit">
                  <v-btn icon @click="editStep"
                    ><v-icon small>mdi-pencil</v-icon></v-btn
                  >
                </template>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ViewRecipeSite",
  props: ["activerecipe", "edit"],
  data: () => ({}),
  methods: {
    editStep() {
      console.info("editStep");
    }
  },
  computed: {
    recipe: {
      get: function() {
        return this.activerecipe;
      },
      set: function(value) {
        this.$emit("input", value);
      }
    }
  }
};
</script>

<style scoped></style>
