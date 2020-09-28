<template>
  <v-row>
    <v-col>
      <v-card class="my-2">
        <v-card-title>
          Save New Recipe
        </v-card-title>
        <v-form ref="form">
          <v-text-field label="Rezept Name" v-model="recipeName"></v-text-field>
        </v-form>
      </v-card>
      <v-list>
        <v-list-group
          :value="false"
          prepend-icon="mdi-account-circle"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-title>
              Titel
            </v-list-item-title>
          </template>

          <v-list-item link v-for="n in 3" :key="n">
            <v-list-item-content>
              <v-list-item-title> {{ n }} Child Title </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "SaveRecipe",
  data: () => ({
    recipeName: "name"
  }),
  methods: {},
  computed: {}
};
</script>

<style scoped></style>
