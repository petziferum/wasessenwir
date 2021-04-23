<template>
  <v-app>
    <v-app-bar clipped app class="pa-0" color="primary" dark>
      <div class="d-flex align-center center mt-0 ml-0">
        <v-app-bar-nav-icon @click="drawer = !drawer"> </v-app-bar-nav-icon>
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
      <v-btn icon @click="logOut"
        ><v-icon large :color="user ? 'green' : 'red'"
          >mdi-account</v-icon
        ></v-btn
      >
    </v-app-bar>

    <v-navigation-drawer app temporary v-model="drawer">
      <v-list>
        <v-list-item-group>
          <v-list-item
            :to="item.to"
            v-for="item in singleItems"
            :key="item.title"
          >
            <v-list-item-icon
              ><v-icon v-text="item.action"></v-icon
            ></v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-content class="bg">
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import firebase from "firebase";
export default {
  name: "App",

  components: {},

  data: () => ({
    drawer: false,
    logo: require("@/assets/fast-food.svg"),
    singleItems: [
      { action: "mdi-login", title: "LogIn", to: "Login" },
      { action: "mdi-upload", title: "Image Upload", to: "/upload" },
      {
        action: "mdi-floppy",
        title: "Rezept speichern",
        to: "saveRecipe"
      },
      { action: "mdi-food", title: "Abendessen", to: "/" },
      { action: "mdi-form-select", title: "Inventar", to: "/inventar" },

    ]
  }),
  methods: {
    logOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          return this.$store.commit("SET_USER", null);
        })
        .catch(function(error) {
          console.error("An error happened", error);
        });
    }
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    }
  },
  beforeMount() {
    //this.$store.dispatch("getRecipes");
  }
};
</script>

<style>
.bg {
  background-color: #ff7e00;
}
</style>
