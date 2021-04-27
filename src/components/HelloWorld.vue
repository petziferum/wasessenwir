<template>
  <v-row no-gutters>
    <v-col>
      <v-toolbar class="pa-3">
      <v-btn @click="$router.back()">Zurück</v-btn>
      </v-toolbar>
      <router-view></router-view>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "HelloWorld",

  data() {
    return{
      recipeId: this.$route.params.recipe_id
    }
  }
};
</script>
<style>
.bg {
}
</style>
