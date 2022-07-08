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
export default {
  name: "DevTestView",
  data: () => ({
    photos: [],
    clientId:
      "539624071543-3lo6c838t6gpc85js56kmlmsve3hv0cf.apps.googleusercontent.com",
    clientKey:
      "2oW7WHlDrTNYXd4Cwci1q4e2"
  }),
  methods: {
    getPhotos() {
      fetch("https://photos.app.goo.gl/wHidnovhXrHwhEoE9").then(res => {
        console.log("res", res);
      });
    }
  },
  computed: {}
};
</script>

<style scoped></style>
