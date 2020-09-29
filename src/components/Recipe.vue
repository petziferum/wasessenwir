<template>
  <v-row>
    <v-col>
      <v-btn @click="$emit('back')">zurück</v-btn>
      <v-card color="#dee8ef" class="my-2">
        <v-card-title>{{ recipe.name }}</v-card-title>
        <v-card-text>{{ recipe.recipeDescription }}</v-card-text>
        <v-img :src="recipe.imageSrc" class="ma-0" max-height="300" cover></v-img>
        <v-btn block  text :href="recipe.imageSrc" target="_blank">{{ recipe.imageName }}</v-btn>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Recipe",
  props: ["recipe"]
};
</script>

<style scoped></style>
