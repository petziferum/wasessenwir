<template>
  <v-row no-gutters>
    <v-col>
        <v-img
          :src="require('../assets/textlogo.svg')"
          class="my-0"
          cover
          height="300px"
        />
      <v-row justify="center" no-gutters style="border-top: solid 4px white;">
        <v-card-title class=" white--text"
          >Ein Entscheidungsfinder um sich für ein Gericht zu
          entscheiden!</v-card-title
        >
      </v-row>
      <v-row>
        <v-col cols="4" v-for="image in dishes" :key="image.id">
          <v-hover v-slot:default="{ hover }">
            <v-card
              :elevation="hover ? 12 : 0"
              height="220px"
              class="overflow-hidden text-center pa-0 ma-0"
            >
              <v-img height="180" :src="image.src" contain></v-img>
              <v-card-text class="font-weight-black text-uppercase">{{
                image.name
              }}</v-card-text>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "HelloWorld",

  data: () => ({
    dishes: [
      { id: 1, name: "Hot Dog", src: require("@/assets/hotdog.png") },
      { id: 2, name: "Pizza", src: require("@/assets/pizza.png") },
      { id: 3, name: "Sandwitch", src: require("@/assets/Sandwitch.png") },
      { id: 4, name: "Sushi", src: require("@/assets/sushi.png") },
      { id: 5, name: "Taco", src: require("@/assets/Taco.png") }
    ]
  })
};
</script>
<style>
.bg {
}
</style>
