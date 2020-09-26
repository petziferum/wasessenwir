<template>
  <v-app>
    <v-app-bar collapse-on-scroll app class="pa-0" color="primary" dark>
      <div class="d-flex align-center center mt-0 ml-0">
        <v-img
          alt="Seiten Logo"
          class="ma-0 pa-0"
          :src="logo"
          contain
          transition="scale-transition"
          height="60"
          width="100"
        />
        <v-card-title class="font-weight-black text-uppercase">
          Was Essen Wir?
        </v-card-title>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content class="bg">
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    logo: require("@/assets/fast-food.svg")
  })
};
</script>

<style>
.bg {
  background-color: #ff7e00;
}
</style>
