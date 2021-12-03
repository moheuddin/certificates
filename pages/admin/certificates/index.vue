<template>
  <div>
    <confirm-delete
      v-show="isConfirmDeleteModalVisible"
      modal-headline="Delete certificate?"
      delete-message="Are you sure?"
      @deleteRecordEvent="deleteCertificate()"
      @close="closeConfirmDeleteModal"
    ></confirm-delete>
    <div class="mb-10">
      <div>
        <loader :loading="loading" />
      </div>
      <div class="flex items-center justify-between border-b-2">
        <h1 class="text-3xl font-bold">Certificates</h1>
        <div>
          <nuxt-link
            to="/admin/certificates/new"
            class="focus:outline-none text-gray-500 hover:text-gray-900"
          >
            <div class="flex items-center gap-5">
              <p class="font-semibold">
                <i class="text-2xl text-red-600 fa fa-plus-square"></i>
              </p>
            </div>
          </nuxt-link>
        </div>
      </div>

      <div class="w-full bg-gray-200"></div>
      <div class="h-full flex justify-center items-center">
        <div class="relative">
          <div class="absolute top-4 left-3">
            <i class="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i>
          </div>
          <input
            type="text"
            class="
              h-14
              w-96
              pl-10
              pr-20
              rounded-lg
              z-0
              focus:shadow focus:outline-none
            "
            placeholder="Search anything..."
          />
          <div class="absolute top-2 right-2">
            <button
              class="
                h-10
                w-20
                text-white
                rounded-lg
                bg-red-500
                hover:bg-red-600
              "
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="grid h-screen grid-cols-1 md:grid-cols-2 gap-10">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="
          w-full
          bg-gradient-to-br
          from-purple-500
          to-indigo-500
          rounded-2xl
        "
      >
        <div class="controls flex w-full justify-end p-2 gap-2">
          <router-link
            class="
              hover:bg-blue-700
              bg-gray-900
              text-red-500
              font-bold
              py-2
              px-4
              rounded
            "
            :to="{
              path: '/admin/certificates/' + item.id,
              params: { id: item.id }
            }"
            ><i class="fa fa-edit"></i
          ></router-link>

          <button
            class="
              bg-gray-900
              hover:bg-blue-700
              text-red-500
              font-bold
              py-2
              px-4
              rounded
            "
            @click="showConfirmDeleteModal(item.id)"
          >
            <i class="fa fa-trash"></i>
          </button>

          <button
            class="
              bg-gray-900
              hover:bg-blue-700
              text-red-500
              font-bold
              py-2
              px-4
              rounded
            "
            @click="viewItem(item.id)"
          >
            <i class="fa fa-eye"></i>
          </button>
        </div>
        <div class="m-auto">
          <span class="font-bold text-white text-xl p-2"
            >Type: {{ item.certificateType }}</span
          >
        </div>
        <div class="w-full m-auto text-white text-xl p-2">
          Title: {{ item.nameofsupply }}
        </div>
        <div class="w-full m-auto text-white text-xl p-2">
          Contractor Name: {{ item.nameofsupply }}
        </div>
        <div class="w-full m-auto text-white text-xl p-2">
          Issued Date: {{ item.date }}
        </div>
        <div class="w-full m-auto text-white text-xl p-2">
          Reference: {{ item.ref }}
        </div>
        <div class="w-full m-auto text-white text-xl p-2">
          Document Type: <span v-if="item.pdfOnly">PDF</span>
          <span v-else>HTML</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapMutations, mapState } from 'vuex';
import loader from '~/components/Loader.vue';
import ConfirmDelete from '~/components/confirmation.vue';
export default {
  name: 'Certification',
  components: { ConfirmDelete, loader },
  layout: 'admin',
  data() {
    return {
      items: null,
      id: '',
      loading: false,
      thead: ['Name', 'E-mail', 'Phone'],
      page: '',
      per_page: 10,
      pages: '',
      isConfirmDeleteModalVisible: false
    };
  },
  computed: {
    /*  items() {
      return this.$store.state.todos.result;
    } */
  },
  mounted() {
    this.loadresult();
    // this.$store.commit('setStoreItems', this.data);
    // this.setItems();
  },
  created() {},
  methods: {
    showConfirmDeleteModal(id) {
      this.id = id;
      this.isConfirmDeleteModalVisible = true;
    },
    closeConfirmDeleteModal() {
      this.isConfirmDeleteModalVisible = false;
    },
    deleteCertificate() {
      this.lodading = true;
      // console.log(this.$axios);
      const id = this.id;
      this.loading = true;
      const res = this.$axios.get('/certificates/deletes/' + id, {
        params: {}
      });
      console.log(res);

      // const array = [{ id: 1 }, { id: 2 }];
      const array = this.items;
      const index = array.findIndex((item) => item.id === this.id); // find idex by id

      this.items.splice(index, 1);

      this.isConfirmDeleteModalVisible = false;
      this.loading = false;
    },
    async loadresult(page) {
      // console.log(this.$axios);
      this.loading = true;
      const res = await this.$axios.get('/certificates', {
        params: {}
      });
      // console.log(res);
      if (res) {
        /*   this.$store.dispatch('setTodos', res.data); */
        // console.log(this.res);
        this.items = res.data.result;
      }
      this.loading = false;
    },

    viewItem(id) {
      this.$router.push('/admin/certificates/view?id=' + id);
    }
  }
};
</script>
