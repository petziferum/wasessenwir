<template>
  <v-container>
    <v-card>
      <v-card-title>
        Hi {{ currentUser.displayName }}
        <v-spacer />
        <v-btn small text outlined color="red" @click.prevent="logout"
          >Log Out</v-btn
        >
      </v-card-title>
      <v-card-subtitle>
        <v-spacer />
        <v-btn small text @click.prevent="getUser">Get User-Data</v-btn>
        <v-btn small text @click="updateUser">Update User</v-btn>
      </v-card-subtitle>
      <template v-if="userData">
        <v-row>
          <v-col cols="6">
            <v-card-text>
              <v-text-field
                label="ID"
                :value="userData.id"
                readonly
              ></v-text-field>
              <v-text-field
                label="User Name"
                :value="userData.userName"
                readonly
              ></v-text-field>
              <v-text-field
                label="lastLogin"
                :value="Date(userData.lastLogin)"
                readonly
              ></v-text-field>
              <v-text-field
                label="email"
                :value="userData.email"
                readonly
              ></v-text-field>
              <v-text-field
                label="recipes"
                :value="userData.recipes"
                readonly
              ></v-text-field>
              <v-text-field
                label="firstName"
                v-model="userData.firstName"
              ></v-text-field>
              <v-text-field
                label="lastName"
                v-model="userData.lastName"
              ></v-text-field>
            </v-card-text>
          </v-col>
          <v-col cols="6">
            <recipe-list-view
              :userData="userData"
              :user-recipes="userRecipes"
              @getRecipes="getUserRecipes"
            />
          </v-col>
        </v-row>
      </template>
    </v-card>
    <!-- Rezepte des Benutzers -->
    <v-card class="mt-4"> </v-card>
  </v-container>
</template>

<script>
import UserAuthentication from "@/components/authentication/UserAuthentication";
import { fireAuth, firestore } from "@/plugins/firebase";
import RecipeListView from "@/components/recipeviewcomponents/RecipeListView";

export default {
  name: "UserDashboard",
  components: { RecipeListView },
  data: () => ({
    userData: null,
    userRecipes: []
  }),
  computed: {
    currentUser() {
      return fireAuth.currentUser;
    }
  },
  methods: {
    async getUserRecipes() {
      this.userRecipes = [];
      const rezepte = this.userData.recipes;
      await Promise.all(
        rezepte.map(async rid => {
          await this.getRecipe(rid)
            .then(res => {
              this.userRecipes.push(res.data());
            })
            .catch(error => {
              console.error("Rezept mit Id: ", rid, " nicht gefunden\n", error);
            });
        })
      );
      console.log("Rezepte fertig geladen!");
    },
    async getRecipe(recipeId) {
      return await firestore
        .collection("recipes")
        .doc(recipeId)
        .get();
    },
    getUser() {
      const uid = this.currentUser.uid;
      UserAuthentication.getUserAccount(uid)
        .then(res => {
          this.userData = res;
        })
        .then(() => {
          this.getUserRecipes();
        });
    },
    updateUser() {
      const user = this.userData.userName;

      const userRef = firestore.collection("users").doc(user);
      userRef
        .update({
          firstName: this.userData.firstName,
          lastName: this.userData.lastName
        })
        .then(() => {
          this.getUser();
        });
    },
    logout() {
      UserAuthentication.userSignout().then(() => {
        this.$router.push("/");
        this.$store.commit("SET_USER", null);
      });
    }
  },
  mounted() {
    this.getUser();
  }
};
</script>

<style scoped></style>
