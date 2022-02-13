<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-spacer />
        <v-btn small text @click.prevent="getUser">petziferum</v-btn>
      </v-card-title>
      <template v-if="user">
        <v-card-text>
          <v-text-field label="ID" :value="user.id" readonly></v-text-field>
          <v-text-field
            label="userName"
            :value="user.userName"
            readonly
          ></v-text-field>
          <v-text-field
            label="lastLogin"
            :value="user.lastLogin"
            readonly
          ></v-text-field>
          <v-text-field
            label="email"
            :value="user.email"
            readonly
          ></v-text-field>
          <v-text-field
            label="recipes"
            :value="user.recipes"
            readonly
          ></v-text-field>
          <v-text-field
            label="firstName"
            :value="user.firstName"
            readonly
          ></v-text-field>
          <v-text-field
            label="lastName"
            :value="user.lastName"
            readonly
          ></v-text-field>
        </v-card-text>
      </template>
    </v-card>
  </v-container>
</template>

<script>
import UserAuthentication from "@/components/authentication/UserAuthentication";

export default {
  name: "UserDashboard",
  data: () => ({
    user: null
  }),
  computed: {},
  methods: {
    getUser() {
      UserAuthentication.getUserAccount("petziferum").then(
        res => (this.user = res)
      );
    }
  }
};
</script>

<style scoped></style>
