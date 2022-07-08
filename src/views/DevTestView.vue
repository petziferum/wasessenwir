<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            Dev Test View
          </v-card-title>
          <v-row justify="center">
            <v-col>
              <v-card>
                <v-card-text>Bilder</v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn @click="getPhotos">GOogle Fotos</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col> </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { web } from "../plugins/photocredentials.json";
export default {
  name: "DevTestView",
  data: () => ({
    photos: []
  }),
  methods: {
    getPhotos() {
      const scope = "https://www.googleapis.com/auth/photoslibrary.readonly";
      const key = web.clientKey;
      fetch("https://photoslibrary.googleapis.com/v1/albums", {
        method: "GET",
        headers: { Authentication: "Bearer Token" }
      })
        .then(res => res.json())
        .then(data => {
          console.log(scope, data, key);
        });
    }
  },
  computed: {}
};
</script>

<style scoped></style>
