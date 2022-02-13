<template>
  <v-row justify="center">
    <v-col cols="12" lg="10">
      <v-card max-width="500" class="mt-10">
        <v-card-title>Registrieren</v-card-title>
        <v-form ref="registerform" @submit.prevent="signup">
          <v-card-text>
            <v-text-field
              label="Benutzername"
              v-model="username"
            ></v-text-field>
            <v-text-field label="E-Mail Adresse" v-model="email"></v-text-field>
            <v-text-field
              label="Passwort"
              type="password"
              v-model="password"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn text color="info" type="submit">Registrieren</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import UserAuthentication from "@/components/authentication/UserAuthentication";
import User from "./authentication/User";

export default {
  data: () => ({
    username: "",
    email: "",
    password: ""
  }),
  methods: {
    signup() {
      const user = User.createEmptyUser()
        .withUserName(this.username)
        .withEmail(this.email);
      UserAuthentication.userSignup(user, this.password)
        .then(res => {
          console.log("registerComponent", res);
        })
        .finally(() => (this.password = ""));
    }
  }
};
</script>

<style scoped></style>
