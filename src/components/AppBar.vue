<template>
  <v-app-bar clipped app class="pa-0" color="primary" dark>
    <div class="d-flex align-center center mt-0 ml-0">
      <v-app-bar-nav-icon
        v-show="$vuetify.breakpoint.smAndDown"
        @click="$emit('showdrawer')"
      >
      </v-app-bar-nav-icon>
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
        Rezept-o-Mat
      </v-card-title>
    </div>

    <v-spacer></v-spacer>
    <v-btn icon to="/userdashboard"
      ><v-icon large :color="user ? 'green' : 'red'">mdi-account</v-icon></v-btn
    >
    <p v-if="user">Hi - {{ userdata }}</p>
    <template v-if="$vuetify.breakpoint.mdAndUp" v-slot:extension>
      <v-tabs>
        <v-tabs-slider></v-tabs-slider>
        <v-tab link :to="item.to" v-for="(item, i) in menuItems" :key="i">
          <v-icon>{{ item.action }}</v-icon>
          {{ item.title }}
        </v-tab>
      </v-tabs>
    </template>
  </v-app-bar>
</template>

<script>
import getUser from "@/plugins/getUser";

export default {
  name: "AppBar",
  data: () => ({
    logo: require("@/assets/fast-food.svg")
  }),
  methods: {},
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
    userdata() {
      return getUser().email;
    },
    menuItems() {
      return this.$store.getters.menuItems;
    }
  }
};
</script>

<style scoped></style>
