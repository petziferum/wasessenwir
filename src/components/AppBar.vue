<template>
  <v-app-bar clipped app class="pa-0" color="primary" dark>
    <div class="d-flex align-center center mt-0 ml-0">
      <v-app-bar-nav-icon
        v-show="$vuetify.breakpoint.smAndDown"
        @click="$emit('showdrawer')"
      >
      </v-app-bar-nav-icon>
      <v-img
        alt="logo"
        class="ma-0 pa-0"
        :src="logo"
        contain
        transition="scale-transition"
        height="60"
        width="100"
      /><v-icon x-large v-if="loading">mdi-loading mdi-spin</v-icon>
    </div>

    <template v-if="$vuetify.breakpoint.mdAndUp" v-slot:extension>
      <v-tabs>
        <v-tabs-slider></v-tabs-slider>
        <v-tab link :to="item.to" v-for="(item, i) in menuItems" :key="i">
          <v-icon>{{ item.action }}</v-icon>
          {{ item.title }}
        </v-tab>
      </v-tabs>

      <v-spacer />

      <v-menu open-on-hover bottom offset-y>
        <template v-slot:activator="{ on }">
          <v-btn tile class="usermenu elevation-0" v-on="on">
            <v-icon small>mdi-account</v-icon>
            {{ user ? "Hallo " + user.userName : "Login" }}
          </v-btn>
        </template>
        <v-list tile>
          <v-list-item link v-if="!user" to="/login">
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item>
          <template v-if="user">
            <v-list-item link to="/userdashboard">
              <v-list-item-title>User Dashboard</v-list-item-title>
            </v-list-item>
            <v-list-item link @click="logout">
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </template>
        </v-list>
      </v-menu>
    </template>
  </v-app-bar>
</template>

<script>
import { fireAuth } from "@/plugins/firebase";
import UserAuthentication from "@/components/authentication/UserAuthentication";

export default {
  name: "AppBar",
  data: () => ({
    logo: require("@/assets/fast-food.svg"),
  }),
  methods: {

    logout() {
      UserAuthentication.userSignout().then((message) => {
        this.$router.push("/");
        this.$store.commit("SET_USER", null);
        this.$toast(message);
      });
    },
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    user() {
      console.log(this.$store.getters.getUser);
      return this.$store.getters.getUser;
    },
    userdata() {
      return fireAuth.currentUser;
    },
    menuItems() {
      return this.$store.getters.menuItems;
    },
  },
};
</script>

<style scoped>
.usermenu {
  position: absolute;
  cursor: default;
  margin: 0;
  right: 0;
  padding: 0;
  bottom: 0;
  background-color: rgba(250, 250, 250, 0.4) !important;
}
</style>
