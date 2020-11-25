<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Inventar</h1>
        <v-data-table
          dense
          :items="foodTable.items"
          :headers="foodTable.headers"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Inventar</v-toolbar-title>
              <v-divider class="mx-4" vertical inset></v-divider>
              <v-spacer></v-spacer>

              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    Lebensmittel hinzufügen
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">Neues Lebensmittel</span>
                  </v-card-title>
                  <v-form @submit.prevent="save">
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.name"
                              label="Lebensmittel"
                              autofocus
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.category"
                              label="Kategroie"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model.number="editedItem.value"
                              label="Menge"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="12" md="12">
                            <v-text-field
                              v-model.number="editedItem.description"
                              label="Beschreibung"
                              filled
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="close">
                        Cancel
                      </v-btn>
                      <v-btn color="blue darken-1" text type="submit">
                        Save
                      </v-btn>
                    </v-card-actions>
                  </v-form>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Inventar",
  data: () => ({
    dialog: false,
    editedIndex: -1,
    editedItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    },
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    }
  }),
  methods: {
    editItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.items.splice(this.editedIndex, 1);
      this.closeDelete();
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.foodTable.items[this.editedIndex], this.editedItem);
      } else {
        this.foodTable.items.push(this.editedItem);
      }
      this.close();
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    }
  },
  computed: {
    foodTable() {
      return this.$store.state.foodTable;
    }
  }
};
</script>

<style scoped></style>
