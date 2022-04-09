<template>
  <v-card class="ma-1">
    <v-card-text>
      <v-text-field label="ID" :value="user.id" readonly></v-text-field>
      <v-text-field
        label="User Name"
        :value="user.userName"
        readonly
      ></v-text-field>
      <v-text-field
        label="lastLogin"
        :value="Date(user.lastLogin)"
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
        v-model="user.firstName"
      ></v-text-field>
      <v-text-field label="lastName" v-model="user.lastName"></v-text-field>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "UserTextFields",
  props: ["userData"],
  computed: {
    user: {
      get: function() {
        return this.userData;
      },
      set: function(data) {
        this.$emit("input", data);
      }
    }
  }
};
</script>

<style scoped></style>
