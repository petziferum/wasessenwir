<template>
  <v-row justify="center" no-gutters>
    <v-col cols="12">
      <v-list elevation="10">
        <v-subheader>Rezepte</v-subheader>
        <template v-for="(n) in items">
          <v-list-item link @click="$emit('recipe', n)" three-line :key="n.id" class="rounded">
            <v-list-item-content>
              <v-list-item-title>Rezept {{ n.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ n.description }}</v-list-item-subtitle>
              <v-list-item-subtitle class="mb-0">
                <v-chip-group>
                  <v-chip x-small>Fleisch</v-chip>
                  <v-chip x-small>Easy</v-chip>
                </v-chip-group>
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-icon color="grey lighten-1">mdi-arrow-right</v-icon>
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
  props:[ "items"],
  methods: {
  }
};
</script>

<style scoped></style>
