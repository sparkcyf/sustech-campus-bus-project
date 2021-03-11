<template>
  <v-card
      color="grey lighten-4"
      flat
      tile
      ref="title_bar"
  >
    <v-toolbar dense>
<!--      <v-app-bar-nav-icon></v-app-bar-nav-icon>-->

      <v-toolbar-title>南科大校巴 SUSTech Next Bus</v-toolbar-title>

      <v-spacer></v-spacer>

<!--      <v-btn icon>-->
<!--        <v-icon>mdi-magnify</v-icon>-->
<!--      </v-btn>-->

<!--      <v-btn icon>-->
<!--        <v-icon>mdi-heart</v-icon>-->
<!--      </v-btn>-->

<!--      <v-btn icon>-->
<!--        <v-icon>mdi-dots-vertical</v-icon>-->
<!--      </v-btn>-->
    </v-toolbar>
  </v-card>
</template>

<script>
export default {
name: "title_bar"
}
</script>

<style scoped>
.v-toolbar {
  font-family: Roboto,sans-serif;
  font-weight: bold;
  line-height: 1.5;
}
</style>