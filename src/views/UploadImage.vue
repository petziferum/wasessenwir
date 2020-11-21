<template>
  <v-container>
    <v-row>
      <v-col>
        <ImageUpload v-on:uploaded="uploadReady" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-img width="100px" :src="image"></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ImageUpload from "@/components/ImageUpload";
export default {
  name: "imageupload",
  components: {
    ImageUpload
  },
  data: () => ({
    image: null
  }),
  methods: {
    uploadReady(img) {
      this.image = img;
    }
  },
  computed: {}
};
</script>

<style scoped></style>
