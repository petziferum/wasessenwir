<template>
  <v-container>
    <v-card>
      <v-list>
        <v-list-item dense v-for="recipe in recipes" :key="recipe.name">
          <v-list-item-avatar>
            <v-icon large>{{ recipe.icon }}</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ recipe.name }}</v-list-item-title>
            <v-list-item-subtitle>
              <v-chip-group>
                <v-chip small v-for="(option, i) in recipe.options" :key="i">
                  {{ option.name }}: {{ option.value }}
                </v-chip>
              </v-chip-group>
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              {{ recipe.description }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "AirFryRecipesView",
  data: () => ({
    recipes: [
      {
        name: "Pommes TK",
        icon: "mdi-french-fries",
        options: [
          { name: "Temperatur", value: "180" },
          { name: "Zeit", value: "10 + 10 Min" }
        ],
        description:
          "Pommes 10 min bei 180 Grad frittieren dann schütteln, mit Öl gemisch bestreichen und nochmal 10 min frittieren."
      },
      {
        name: "Chickenwings TK",
        icon: "mdi-food-drumstick",
        options: [
          { name: "Temperatur", value: "180" },
          { name: "Zeit", value: "20 Min" }
        ],
        description:
          "Hähnchenteile einfach 20 Min in die AirFry kloppen, fertig."
      }
    ]
  })
};
</script>

<style scoped></style>
