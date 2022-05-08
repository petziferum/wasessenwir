<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" md="6" lg="4">
        <v-card>
          <v-img :src="activerecipe.imageSrc" width="100%" height="250"></v-img>
          <v-card-text style="position: relative;">
            <v-card
              style="position: relative; top:-50px;margin-left:5px; margin-right: 5px;"
              elevation="10"
            >
              <v-list>
                <v-list-item v-for="z in activerecipe.ingredients" :key="z.nr">
                  <v-list-item-title>
                    <span v-if="z.menge">{{ z.menge }} - </span>
                    <span v-else> - - </span>{{ z.name }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card>
          </v-card-text>
          <v-divider />
          <v-card-text
            v-for="text in activerecipe.recipeDescription"
            :key="text.nr"
            class="text-body-1 elevation-2"
          >
            <v-row>
              <v-col cols="1">{{ text.nr }}.</v-col>
              <v-col cols="10">
                <template v-if="editItemNumber === text.nr">
                  <v-textarea v-model="editItemText"></v-textarea>
                  <v-spacer />
                  <div style="text-align: right;">
                    <v-btn class="mr-2" color="error" @click="cancel"
                      >Abbrechen</v-btn
                    >
                    <v-btn color="success" @click="save">Speichern</v-btn>
                  </div>
                </template>
                <template v-else>{{ text.text }} </template></v-col
              >
              <v-col cols="1">
                <template v-if="edit">
                  <v-btn icon @click="editStep(text.nr)"
                    ><v-icon small>mdi-pencil</v-icon></v-btn
                  >
                </template>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ViewRecipeSite",
  props: ["activerecipe", "edit"],
  data: () => ({
    editItemNumber: null,
    editItemText: ""
  }),
  methods: {
    editStep(nr) {
      console.info("editStep", nr, this.recipe.recipeDescription[nr - 1]);
      if (this.editItemNumber === nr) {
        this.cancel();
      } else {
        this.editItemNumber = nr;
        this.editItemText = this.recipe.recipeDescription[nr - 1].text;
      }
    },

    cancel() {
      this.editItemNumber = null;
      this.editItemText = "";
    },

    save() {
      this.recipe.recipeDescription[
        this.editItemNumber - 1
      ].text = this.editItemText;
      this.editItemNumber = null;
    }
  },
  computed: {
    recipe: {
      get: function() {
        return this.activerecipe;
      },
      set: function(value) {
        this.$emit("input", value);
      }
    }
  }
};
</script>

<style scoped></style>
