<template>
  <v-row no-gutters>
    <v-col>
      <v-toolbar height="100%">
      <v-btn  color="primary"  fab @click="$router.back()">

        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
        <div class="mx-auto" color="black">{{recipeId}}</div>
      </v-toolbar>
      <v-main style="border:1px solid green; padding:0; margin:0; bottom:0; height: 100%">
      <router-view style="height: 100%"></router-view>
      </v-main>
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
