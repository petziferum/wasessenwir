<template>
  <v-app>
    <v-app-bar app class="pa-0" color="primary" dark>
      <div class="d-flex align-center center mt-0 ml-0">
        <v-img
          alt="Seiten Logo"
          class="mr-2 pa-0"
          :src="logo"
          contain
          transition="scale-transition"
          height="60"
          width="200"
        />
        Was Essen Wir?
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
      <HelloWorld />
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",

  components: {
    HelloWorld
  },

  data: () => ({
    logo: require("@/assets/fast-food.svg")
  })
};
</script>
