<template>
  <v-app>
    <v-app-bar clipped collapse-on-scroll app class="pa-0" color="primary" dark>
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
          Was Essen Wir?
        </v-card-title>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer app temporary v-model="drawer">
      <v-list>
        <v-list-item-group>
          <v-list-item :to="item.to" v-for="item in singleItems" :key="item.title">
            <v-list-item-icon
              ><v-icon v-text="item.action"></v-icon
            ></v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>

        <v-list-group
          v-for="item in items"
          :key="item.title"
          v-model="item.active"
          :prepend-icon="item.action"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            :to="child.to"
            v-for="child in item.items"
            :key="child.title"
          >
            <v-list-item-content>
              <v-list-item-title v-text="child.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

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
    drawer: false,
    logo: require("@/assets/fast-food.svg"),
    singleItems: [
      {
        action: "mdi-floppy",
        title: "Rezept speichern",
        to: "saveRecipe"
      }
    ],
    items: [
      {
        action: "mdi-silverware-fork-knife",
        active: false,
        items: [
          { title: "Abendessen", to: "/" },
          { title: "New American", to: "/" },
          { title: "Sushi", to: "/" }
        ],
        title: "Rezepte"
      }
    ]
  }),
  methods: {},
  computed: {},
  beforeMount() {
    this.$store.dispatch("getRecipes");
  }
};
</script>

<style>
.bg {
  background-color: #ff7e00;
}
</style>
