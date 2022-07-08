<template>
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
</template>

<script>
import { web } from "@/plugins/photocredentials.json";

export default {
  name: "googlePhotos",
  data: () => ({
    photos: []
  }),
  methods: {
    getPhotos() {
      const scope = "https://www.googleapis.com/auth/photoslibrary.readonly";
      const key = web.client_secret;
      let headers = {
        Authorization: "Bearer " + key
      };
      console.info("fetch", headers);
      fetch("https://photoslibrary.googleapis.com/v1/albums", {
        headers: headers
      })
        .then(res => res.json())
        .then(data => {
          console.log(scope, data);
        });
    }
  },
  computed: {}
};
</script>

<style scoped></style>
