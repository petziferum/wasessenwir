<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <ImageUpload v-on:uploaded="uploadReady" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-img width="300px" :src="image"></v-img>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6" sm="3" md="2" lg="1" v-for="(b,i) in imageGallerie" :key="i">
       <v-card class="pa-0 ma-0">
           <v-img :src="b" class="mx-auto" height="100px"></v-img>
       </v-card>
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
  computed: {
    imageGallerie(){
      return this.$store.state.gallerie;
    }
  },
  beforeMount() {
    this.$store.dispatch("loadImages")
  }
};
</script>
<style scoped></style>
