<template>
  <v-app>
    <AppBar v-on:showdrawer="drawer = !drawer"></AppBar>
    <v-navigation-drawer app temporary v-model="drawer">
      <v-list>
        <v-list-item-group>
          <v-list-item
            :to="item.to"
            v-for="item in singleItems"
            :key="item.title"
          >
            <v-list-item-icon
              ><v-icon>{{ item.action }}</v-icon
            ></v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main class="bg px-0 mx-0">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import AppBar from "@/components/AppBar";
export default {
  name: "App",

  components: { AppBar },

  data: () => ({
    drawer: false
  }),
  methods: {},
  computed: {
    singleItems() {
      return this.$store.getters.menuItems;
    }
  },
  beforeMount() {
    //this.$store.dispatch("getRecipes");
  }
};
</script>

<style>
.bg {
  background-color: #80d6ff;
}
</style>
