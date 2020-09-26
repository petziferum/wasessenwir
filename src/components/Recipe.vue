<template>
<v-row>
  <v-col>
    <v-btn @click="$emit('back')">zurück</v-btn>
    <v-card color="#dee8ef" class="my-2">
      <v-card-title>{{ recipe.name }}</v-card-title>
      <v-card-text>{{recipe.description }}</v-card-text>
    </v-card>
  </v-col>
</v-row>
</template>

<script>
export default {
name: "Recipe",
  props:[ "recipe" ]
}
</script>

<style scoped>

</style>
