<template>
  <v-container fluid class="pa-0">
    <v-row no-gutters>
      <v-img
        :src="require('../assets/textlogo.svg')"
        class="my-0 pa-0"
        cover
        height="300px"
      >
        <v-row justify="center" class="search" no-gutters>
          <v-col cols="11" md="6">
            <v-form ref="searchForm" @submit.prevent="search">
              <v-text-field
                class="textfield"
                background-color="#ffeeca"
                filled
                rounded
                v-model="searchValue"
                id="search-item"
                label="Rezept suchen"
                prepend-inner-icon="mdi-magnify"

              ></v-text-field>
            </v-form>
          </v-col>
        </v-row>
      </v-img>
    </v-row>

    <v-row v-if="loading">
      <v-col v-for="n in 4" :key="n" cols="12" sm="8" md="6" lg="4">
        <v-skeleton-loader type="article, actions" :key="n">
        </v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row class="ma-5" :justify="$vuetify.breakpoint.smAndDown ? 'center' : 'start'">
      <v-col
        cols="12"
        sm="6"
        md="6"
        lg="4"
        xl="3"
        v-for="rez in recipes"
        :key="rez.id"
      >
        <v-card style="cursor: pointer" to="/recipe">
          <v-card-title>{{ rez.recipeName }}</v-card-title>
          <v-img :src="rez.imageSrc" max-height="200"></v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import firebase from "firebase";
export default {
  name: "Home",
  components: {},
  data: () => ({
    searchValue: "",
    activeRecipe: null,
    tab: 0,
    images: ""
  }),
  watch: {
    activeRecipe(val) {
      console.info("aktiv: ", val.recipeName);
    }
  },
  methods: {
    getRecipes() {
      this.$store.dispatch("getRecipes");
    },
    search(value) {
      console.info("Es wird nach", value, "gesucht");
    },
    getImages() {
      const storageRef = firebase.storage().ref();
      const imageRef = storageRef.child("recipes");
      imageRef.listAll().then(res => {
        res.items.forEach(el => {
          this.images =
            "https://" + el.location.bucket + "/" + el.location.path;
        });
      });
    },
    showRecipe(n) {
      this.activeRecipe = n;
      this.tab = 1;
      console.info("recipe", n);
      this.searchValue = "";
    },
    editRecipe(n) {
      this.activeRecipe = n;
      this.tab = 2;
      console.info("Rezept bearbeiten", n.recipeName);
    }
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    recipes() {
      return this.$store.getters.getRecipes.filter(recipes => {
        return this.searchValue
          .toLowerCase()
          .split(" ")
          .every(v => recipes.recipeName.toLowerCase().includes(v));
      });
    },
    searchItem() {
      return this.$store.getters.getRecipes.filter(el => {
        return this.searchValue
          .toLowerCase()
          .split(" ")
          .every(v => el.recipeName.toLowerCase().includes(v));
      });
    }
  },
  beforeMount() {
    this.getRecipes();
  }
};
</script>
<style>
.search {
  position: absolute;
  bottom: 0;
  width: 100%;
}
.textfield {
  width: 100%;
}
</style>
