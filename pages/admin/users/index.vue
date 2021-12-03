<template>
  <div>
    <div class="mb-10 flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold">Manage your users</h1>
        <p class="text-gray-500">Create, edit or just delete them</p>
      </div>
      <div>
        <nuxt-link
          to="users/new"
          class="focus:outline-none text-gray-500 hover:text-gray-900"
        >
          <div class="flex items-center gap-5">
            <p class="font-semibold">Create new user</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </nuxt-link>
      </div>
    </div>
    <v-row align="center" class="mx-auto">
      <!--<v-col cols="12" md="8">
          <v-text-field v-model="title" label="Search by name"></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-btn small @click="searchTitle"> Search </v-btn>
        </v-col>-->

      <v-col cols="12" sm="12">
        <v-card class="mx-auto" tile>
          <v-card-title>Users</v-card-title>

          <v-data-table :headers="headers" :items="items" disable-pagination>
            <template #[`item.actions`]="{ item }">
              <v-icon small class="mr-2" @click="editItem(item.id)"
                >mdi-pencil</v-icon
              >
              <v-icon small @click="deleteItem(item.id)">mdi-delete</v-icon>
            </template>
          </v-data-table>

          <!--<v-card-actions v-if="tutorials.length > 0">
              <v-btn small color="error" @click="removeAllTutorials">
                Remove All
              </v-btn>
            </v-card-actions>-->
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'Users',
  layout: 'admin',
  data() {
    return {
      items: [],
      title: '',
      search: '',
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'E-mail', value: 'email' },
        { text: 'Actions', value: 'actions', sortable: false }
      ]
    };
  },
  mounted() {
    this.loadresult();
  },
  methods: {
    async loadresult(page) {
      // console.log(this.$axios);
      this.loading = true;
      const res = await this.$axios.get('/users', {
        params: {}
      });
      // console.log(res);
      if (res) {
        this.items = res.data.data;
        console.log(res.data.data);
      }
      this.loading = false;
    },
    deleteItem(item) {
      console.log(item);
    },
    editItem(item) {
      console.log(item);
      this.$router.push('/admin/users/' + item);
    }
  }
};
</script>
