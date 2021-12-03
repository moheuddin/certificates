<template>
  <div>
    <div class="mb-10 flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold">Add new user</h1>
        <p class="text-gray-500">Fill the form</p>
      </div>
    </div>
    <loader />
    <form class="max-w-full">
      <div class="grid grid-cols-1 md:grid-cols-2 md:gap-x-10 md:gap-y-5">
        <v-text-field v-model="form.name" label="Name"></v-text-field>

        <div v-if="form.errors.has('name')" v-html="form.errors.get('name')" />
        <v-text-field v-model="form.email" label="E-mail"></v-text-field>
        <SelectInput
          id="role"
          v-model="form.role"
          name="role"
          :options="options"
        />
      </div>
      <div>
        <div class="flex justify-end items-center gap-6 mt-16">
          <nuxt-link to="/admin/users" class="text-gray-500 hover:text-gray-900"
            >Cancel</nuxt-link
          >

          <v-btn color="red" @click="saveData">
            Save
            <v-progress-circular
              v-if="form.busy"
              indeterminate
              color="red"
            ></v-progress-circular>
          </v-btn>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Vue from 'vue';
import { Form, HasError, AlertError } from 'vform';
import loader from '~/components/Loader.vue';
window.Form = Form;
Vue.component(HasError.name, HasError);
Vue.component(AlertError.name, AlertError);
Vue.component(HasError.name, HasError);
Vue.component(AlertError.name, AlertError);
export default {
  components: {
    loader
  },
  layout: 'admin',
  data() {
    return {
      options: ['Admin', 'User'],
      editMode: false,
      loading: false,
      form: new Form({
        name: '',
        email: '',
        role: '',
        id: ''
      })
    };
  },
  mounted() {
    // console.log(this.$route.params._id);
    const id = this.$route.params;
    if (id != undefined) {
      this.loadData(id);
    }
  },
  methods: {
    async loadData(id) {
      // console.log(this.$axios);
      this.loading = true;
      // console.log(id);
      const res = await this.$axios.get('/users/' + id.id, {
        params: {}
      });
      console.log(res.data.data);
      if (res) {
        this.form.fill(res.data.data);
        this.editMode = true;
      }
      this.loading = false;
    },
    saveData() {
      this.loading = true;

      this.$axios
        .post('users/store', this.form)
        .then((res) => {})
        .catch((err) => console.log(err));
      this.loading = false;
    }
  }
};
</script>

<style></style>
