<template>
  <v-row justify="center" no-gutters>
    <v-col cols="12">
      <template v-if="loading">
        <v-progress-linear
          color="accent"
          height="10"
          indeterminate
          size="100"
          width="10"
        >
        </v-progress-linear>
        Loading ...
      </template>
      <v-list elevation="0">
        <template v-for="n in items">
          <v-list-item
            link
            @click="$emit('recipe', n)"
            three-line
            :key="n.id"
            class="rounded"
          >
            <v-list-item-avatar width="80" height="80"
              ><v-img :src="n.imageSrc" conver></v-img
            ></v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ n.recipeName }}</v-list-item-title>
              <v-list-item-subtitle>{{
                n.recipeDescription[0].text
              }}</v-list-item-subtitle>
              <v-list-item-subtitle class="mb-0">
                <v-chip-group>
                  <v-chip
                    class="rounded-0 elevation-3"
                    small
                    v-for="(i, x) in n.ingredients"
                    :key="i + x"
                    >{{ i }}</v-chip
                  >
                </v-chip-group>
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-icon color="accent">mdi-arrow-right-bold</v-icon>
            </v-list-item-action>
          </v-list-item>
          <v-divider :key="`${n.id}-d`"></v-divider>
        </template>
      </v-list>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "MealList",
  props: ["items"],
  methods: {},
  computed: {
    loading() {
      return this.$store.getters.loading;
    }
  }
};
</script>

<style scoped></style>
