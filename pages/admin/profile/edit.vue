<template>
  <div class="space-y-16">
    <div class="flex justify-between w-full">
      <div>
        <h1 class="text-2xl font-bold">Edit your profile</h1>
        <p class="text-gray-500">Edit, edit, edit</p>
      </div>
      <nuxt-link
        to="/admin/profile"
        class="
          bg-gray-100
          hover:bg-gray-300
          text-gray-400
          hover:text-gray-600
          font-semibold
          py-2
          px-6
          rounded
          mx-auto
          md:mx-0
          my-4
          md:my-0
          block
          focus:outline-none
        "
        >Back to profile</nuxt-link
      >
    </div>

    <div class="w-full">
      <loader :loading="loading" />
      <form>
        <section class="space-y-5">
          <h2 class="text-xl font-bold">General Settings</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 md:gap-x-10 md:gap-y-5">
            <v-text-field
              v-model="profileform.name"
              class="d-flex"
              cols="12"
              sm="6"
              label="Name"
              required
            ></v-text-field>
            <v-text-field
              v-model="profileform.email"
              class="d-flex"
              cols="12"
              sm="6"
              label="Email"
              required
            ></v-text-field>
            <v-text-field
              v-model="profileform.phone"
              class="d-flex"
              cols="12"
              sm="6"
              label="Phone"
            ></v-text-field>

            <div>
              <label class="custom-file mt-5" for="file">
                {{
                  files.length
                    ? `(${files.length}) files are selected`
                    : 'Choose files'
                }}
                <input
                  id="file"
                  ref="fileInput"
                  multiple
                  name="file"
                  type="file"
                  @change="handleSelectedFiles"
                />
              </label>
              <div>
                <div
                  v-for="(file, key) in files"
                  :key="file + 1"
                  class="file-listing mt-5"
                >
                  {{ file.name }}
                  <button class="" @click="removeFile(key)">
                    <v-icon class="text-red-700"> mdi-minus-circle </v-icon>
                  </button>
                </div>
              </div>
              <!--Submit Button && Progress Bar-->
            </div>
          </div>
        </section>

        <div class="flex justify-end items-center gap-6 mt-16">
          <v-btn
            type="button"
            class="
              px-10
              py-4
              bg-pink-500
              hover:bg-pink-800
              text-white
              font-semibold
              rounded
            "
            @click="saveProfile"
          >
            Save
          </v-btn>
        </div>
      </form>

      <hr />

      <form>
        <section class="space-y-5">
          <h2 class="text-xl font-bold">Password</h2>
          <div class="md:space-y-5">
            <Input
              placeholder="Your old password"
              name="oldPassword"
              type="password"
            />

            <div class="md:flex md:space-x-10">
              <Input
                placeholder="Your new password"
                name="newPassword"
                type="password"
              />
              <Input
                placeholder="Your new password again"
                name="newPasswordAgain"
                type="password"
              />
            </div>
          </div>
        </section>
        <div class="flex justify-end items-center gap-6 mt-16">
          <v-btn
            type="button"
            class="
              px-10
              py-4
              bg-pink-500
              hover:bg-pink-800
              text-white
              font-semibold
              rounded
            "
            @click="savePassword"
          >
            Save
          </v-btn>
        </div>
      </form>
    </div>
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
  name: 'EditProfile',
  components: { loader },
  layout: 'admin',
  data() {
    return {
      loading: false,
      files: [],
      /*   profileForm: this.$vform({
        action: 'login',
        email: 'admin@admin.com',
        password: 'admin123'
      }), */
      profileform: new Form({ id: '', name: '', email: '' }),
      passwordform: new Form({})
    };
  },
  mounted() {
    this.loadResult();
  },
  methods: {
    async loadResult() {
      // console.log(this.$axios);
      this.loading = true;
      const res = await this.$axios.get(
        '/users/' + this.$store.state.auth.user.id,
        {
          params: {}
        }
      );
      console.log(res.data.data);

      if (res) {
        this.profileform.fill(res.data.data);
      }
      this.loading = false;
    },
    saveProfile() {
      this.loading = true;
      const config = {
        header: {
          'Content-Type': 'multipart/form-data'
        }
      };

      const formData = new FormData();
      Object.keys(this.profileform).forEach((key) => {
        formData.append(key, this.profileform[key]);
      });
      formData.append('files', this.files[0]);
      for (let i = 0; i < this.files.length; i++) {
        const file = this.files[i];
        formData.append('files[' + i + ']', file);
      }

      this.$axios
        .post('users/store', formData, config)
        .then((res) => {
          // this.progress = 0;
          // this.files = [];
          // console.log(res);
        })
        .catch((err) => console.log(err));
      this.loading = false;
    },
    savePassword() {},
    handleSelectedFiles() {
      const selectedFiles = this.$refs.fileInput.files;

      for (let i = 0; i < selectedFiles.length; i++) {
        /* Check Already Has Been Selected Or Not ... */
        const isFileExists = this.files.find(
          (file) =>
            file.type === selectedFiles[i].type &&
            file.name === selectedFiles[i].name &&
            file.size === selectedFiles[i].size &&
            file.lastModified === selectedFiles[i].lastModified
        );

        if (!isFileExists) {
          this.files.push(selectedFiles[i]);
        }
      }
    },
    gotoIdenx() {
      this.$router.push('/admin/certificates/');
    },
    removeFile(key) {
      this.files.splice(key, 1);
    },
    selectFile(e) {
      console.log(e);
      const files = e.target.files || e.dataTransfer.files;
      if (!this.files.length) {
        return;
      }
      this.createImage(files[0]);
    }
  }
};
</script>
