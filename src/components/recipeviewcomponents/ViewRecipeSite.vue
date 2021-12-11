<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" md="6" lg="4">
        <v-card>
          <v-card-text>
            <v-list>
              <v-list-item v-for="z in activerecipe.ingredients" :key="z.nr">
                <v-list-item-title>
                  <span v-if="z.menge">{{ z.menge }} - </span>{{ z.name }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card-text>
          <v-divider />
          <v-card-text
            v-for="text in activerecipe.recipeDescription"
            :key="text.nr"
            class="text-body-1"
          >
            {{ text.nr }}. {{ text.text }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ViewRecipeSite",
  props: ["activerecipe"],
  data: () => ({}),
  methods: {},
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
