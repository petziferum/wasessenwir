<template>
  <v-row no-gutters>
    <v-col>
      <v-toolbar height="100%">
      <v-btn  color="primary"  fab @click="$router.back()">

        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
        <div class="mx-auto" color="black">{{recipeId}}</div>
      </v-toolbar>
      <router-view></router-view>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "HelloWorld",
  props: [
    "title"
  ],

  data() {
    return{
      recipeId: this.$route.params.recipe_id
    }
  }
};
</script>
<style>

</style>
