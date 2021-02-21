<template>
  <v-app>
    <v-main>
      <v-container>

<!--        <v-row>-->
<!--        <h2>SUSTech Next Bus</h2>-->
<!--        </v-row>-->
        <v-row style="height: 10px;">

        </v-row>
        <v-row >
          <v-select
              v-model="this.$parent.query_string_sta"
              :items="this.$parent.stations"
              item-text="name"
              item-value="no"
              outlined
              label="Select the station:"
              v-on:change="this.$parent.changestation"
              style="width: 70%; height: 50px;"
          ></v-select>
          <v-btn
              depressed
              color="primary"
              v-on:click="this.$parent.refresh"
              style="width: 30%; height: 55px;"
          >
            Refresh ({{this.$parent.countdown_timer}})
          </v-btn>
        </v-row>
<!--        <v-row style="height: 15px;"></v-row>-->





<!--        <v-row><h2>Timetable</h2></v-row>-->
        <v-row>
          <v-col md="3">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-data-table
              :headers="headers"
              :items="posts"
              :items-per-page="5"
              :search="search"
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
              class="elevation-1 mytable"
            >
              <template v-slot:item.actions="{ item }">
                <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
              </template>

              <template v-slot:item.eta_text="{ item }">
                <v-chip
                    :color="getColor(item.eta)"
                    dark
                >
                  {{ item.eta_text }}
                </v-chip>
              </template>

              <template v-slot:item.actions="{ item }">
                <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
              </template>

              <template v-slot:item.peak_text="{ item }">
                <v-chip
                    :color="getColor_peak(item.peak_line)"
                    dark
                >
                  {{ item.peak_text }}
                </v-chip>
              </template>


            </v-data-table>
          </v-col>
        </v-row>



      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  props: ["posts"],
  data: () => ({
    search: "",
    sortBy: 'eta',
    sortDesc: false,
    headers: [
      { text: "BUSID", value: "imei" },
      { text: "DPT_TIME", value: "depart_time_text" },
      { text: "Type", value: "peak_text" },
      { text: "Direction", value: "direction_text", sortable: true },
      { text: "ETA", value: "eta_text"}
    ],
    // class: "blue lighten-5"
    selector_item: [
      'Foo', 'Bar', 'Fizz', 'Buzz'
    ]
  }),
  methods: {
    deleteItem(item) {
      const index = this.posts.indexOf((x) => x.id === item.id);
      this.posts.splice(index, 1);
    },
    getColor (eta) {
      //console.log(eta)
      var eta_num = eta;
      if (eta_num < 120) return 'red'
      else if (eta_num < 600) return 'orange'
      else return 'green'
    },
    getColor_peak (peak) {
      if (peak === 1) return '#ed6b00'
      else return '#003f43'
    },
  },
};
</script>

<style>

.v-data-table > .v-data-table__wrapper > table > tbody > tr > th,
.v-data-table > .v-data-table__wrapper > table > thead > tr > th,
.v-data-table > .v-data-table__wrapper > table > tfoot > tr > th {
  font-size: 18px !important;
}


</style>