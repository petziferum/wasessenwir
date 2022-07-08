<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <firebase-photos />
      </v-col>
      <v-col> </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <google-photos />
      </v-col>
      <v-col> </v-col>
    </v-row>
  </v-container>
</template>

<script>
import GooglePhotos from "@/components/test/googlePhotos";
import FirebasePhotos from "@/components/test/firebasePhotos";
export default {
  name: "DevTestView",
  components: {FirebasePhotos, GooglePhotos},
};
</script>

<style scoped></style>
