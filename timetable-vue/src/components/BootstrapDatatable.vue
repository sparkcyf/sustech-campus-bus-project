<template>
  <div id="app" class="container mt-3 mb-5">
    <h2>Bootstrap Table</h2>
    <b-row class="mb-3">
      <b-col md="3">
        <b-form-input v-model="filter" type="search" id="filterInput" placeholder="Type to Search"></b-form-input>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-table
          striped
          hover
          outlined
          :items="posts"
          :fields="fields"
          :current-page="currentPage"
          :per-page="perPage"
          :filter="filter"
        >
          <template v-slot:cell(actions)="data">
            <b-button variant="danger" @click="deleteItem(data.item.id)">Delete</b-button>
          </template>
        </b-table>
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="my-table"
        ></b-pagination>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  props: ["posts"],
  name: "App",
  data() {
    return {
      filter: "",
      perPage: 1,
      currentPage: 1,
      fields: ["userId", "id", "title", "actions"],
    };
  },
  methods: {
    deleteItem(id) {
      const index = this.posts.indexOf((x) => x.id === id);
      this.posts.splice(index, 1);
    },
  },
  computed: {
    rows() {
      return this.posts.length;
    },
  },
};
</script>



