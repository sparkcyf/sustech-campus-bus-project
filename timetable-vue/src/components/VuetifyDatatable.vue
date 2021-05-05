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
              label="选择出发车站 Select the station:"
              v-on:change="this.$parent.changestation"
              style="width: 60%; height: 50px;"
          ></v-select>
          <v-btn
              depressed
              color="primary"
              v-on:click="this.$parent.refresh"
              style="width: 40%; height: 55px;"
          >
            刷新 Refresh ({{this.$parent.countdown_timer}})
          </v-btn>
        </v-row>
<!--        <v-row style="height: 15px;"></v-row>-->
<!--        <v-row>-->
<!--          <v-select-->
<!--              :items="bus_directions"-->
<!--              label="bus_dir"-->
<!--              @change="filterAuthor"-->
<!--          ></v-select>-->

<!--        </v-row>-->
<!--https://stackoverflow.com/questions/45672145/how-do-i-use-custom-filter-prop-in-data-tables-in-vuetify-or-how-do-i-create-->

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
              :items-per-page="100"
              :search="search"
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
              class="elevation-1 mytable"
              group-by="direction_text"
              show-group-by
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

        <v-row>
          <v-alert
              border="left"
              colored-border
              type="info"
              elevation="2"
              style="width: 98%;"
          >
          本页面仅显示运行中的车辆，若需查看完整时间表，请点击下方按钮查看。<br>This page only shows buses in operation. To view the full timetable, please click the button below.
          </v-alert>
        </v-row>

        <v-row>
          <v-btn
              href="https://sustech.online/transport/workday.html"
              target="_blank"
              style="width: 50%; height: 50px;"

          >
            <v-icon left>
              mdi-briefcase
            </v-icon>
            工作日 Workday
          </v-btn>

          <v-btn
              href="https://sustech.online/transport/holiday.html"
              target="_blank"
              style="width: 50%;height: 50px;"
          >
            <v-icon left>
              mdi-sleep
            </v-icon>
            节假日 Holiday
          </v-btn>
        </v-row>



        <v-row
            style="height: 10px;"
        >

        </v-row>

        <v-row>
          <v-footer
              padless
              style="width: 100%;"
          >
            <v-col
                class="text-center"
                cols="12"

            >
              校园服务办公室/<a href="https://sustech.online">南科手册</a> 支持：<a href="mailto:support@mail.sustech.online?subject=校园巴士反馈">support@mail.sustech.online</a>
            </v-col>
          </v-footer>
        </v-row>



      </v-container>
    </v-main>
  </v-app>
</template>
<!--group-by="direction_text"-->

<script>
export default {
  props: ["posts"],
  data: () => ({
    search: "",
    sortBy: 'eta',
    sortDesc: false,
    headers: [
      // { text: "状态 Status", value: "imei" },
      { text: "发车时间 DPT_TIME", value: "depart_time_text" },
      { text: "类型 Type", value: "peak_text" },
      { text: "方向 Direction", value: "direction_text", sortable: true },
      { text: "预计时间 ETA", value: "eta_text"}
    ],
    // class: "blue lighten-5"
    selector_item: [
      'Foo', 'Bar', 'Fizz', 'Buzz'
    ],
    bus_directions: ['COE', 'Joy Highland'],
  }),
  // computed: {
  //   filteredItems() {
  //     return this.$parent.display_data.filter((i) => {
  //       return !this.foodType || (i.type === this.foodType);
  //     })
  //   },
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