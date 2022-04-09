<template>
  <v-card rounded="xl">
    <v-img :src="r.imageSrc" :height="100">
      <v-app-bar flat color="rgba(0, 0, 0, 0.5)">
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-app-bar-nav-icon
                color="white"
                v-on="on"
            ></v-app-bar-nav-icon>
          </template>
          <v-card>
            <v-card-text>{{ r }}</v-card-text>
          </v-card>
        </v-menu>

        <v-toolbar-title class="text-h6 white--text pl-0">
          {{ r.recipeName }}
        </v-toolbar-title>

        <v-spacer></v-spacer>
      </v-app-bar>
    </v-img>
    <v-card-text>
      <div v-for="d in r.recipeDescription" :key="d.nr">
        {{ d.text }}
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "SmallRecipeCard",
  props: (["r"])
}
</script>

<style scoped>

</style>
