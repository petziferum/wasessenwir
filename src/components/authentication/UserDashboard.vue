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
      </v-card-subtitle>
      <template v-if="userData">
        <v-card-text>
          <v-text-field label="ID" :value="userData.id" readonly></v-text-field>
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
            :value="userData.firstName"
            readonly
          ></v-text-field>
          <v-text-field
            label="lastName"
            :value="userData.lastName"
            readonly
          ></v-text-field>
        </v-card-text>
      </template>
    </v-card>
  </v-container>
</template>

<script>
import UserAuthentication from "@/components/authentication/UserAuthentication";
import { fireAuth } from "@/plugins/firebase";

export default {
  name: "UserDashboard",
  data: () => ({
    userData: null
  }),
  computed: {
    currentUser() {
      return fireAuth.currentUser;
    }
  },
  methods: {
    getUser() {
      UserAuthentication.getUserAccount("petziferum").then(res => {
        console.log("Response", res);
        this.userData = res;
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
