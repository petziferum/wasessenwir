<template>
  <v-container>
    <v-row justify="center">
      <template v-if="user === null">
        <v-col cols="12" sm="6" md="4" lg="3" class="text-center">
          <v-card>
            <v-card-title>Login</v-card-title>
            <v-card-text>
              <v-form ref="loginForm" @submit.prevent="logIn">
                <v-text-field
                  label="Password"
                  type="password"
                  v-model="password"
                ></v-text-field>
                <v-card-text style="color:#ff0000" v-if="errorMessage.state">{{
                  errorMessage.text
                }}</v-card-text
                ><br />
                <v-card-actions>
                  <v-btn type="submit">Login</v-btn>
                </v-card-actions>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </template>
      <template v-else>
        <v-col cols="3">
          <v-alert icon="mdi-alert" colored-border border="top" color="success"
            >Du bist bereits eingelogged</v-alert
          >
          <p></p>
          <v-btn to="/" text>Zurück</v-btn>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script>
import * as firebase from "firebase";

export default {
  name: "LoginPage",
  data: () => ({
    errorMessage: "",
    password: ""
  }),
  methods: {

    logIn() {
      firebase
        .auth()
        .signInWithEmailAndPassword("test@test.de", this.password) //testtest
        .then(res => {
          this.$store.state.user = res.user;
          console.log("eingeloggt", res);
          this.$router.push("/");
        })
        .catch(error => {
          this.errorMessage.state = true;
          this.errorMessage.text = error;

          console.error("fehler", error);
        })
        .finally(() => {
          this.$refs.loginForm.reset();
        });
    }
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    }
  }
};
</script>

<style scoped></style>
