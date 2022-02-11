<template>
  <v-row justify="center">
    <v-col cols="12" lg="10">
      <v-card max-width="500" class="mt-10">
        <v-card-title>Registrieren</v-card-title>
        <v-form ref="registerform" >
          <v-card-text>
            <v-text-field label="Benutzername" v-model="username"></v-text-field>
            <v-text-field label="E-Mail Adresse" v-model="email"></v-text-field>
            <v-text-field label="Passwort" type="password" v-model="password"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn text color="info">Registrieren</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>

export default {
  data:() => ({
    username: "",
    email: "",
    password: ""
  })

}
</script>

<style scoped>

</style>
