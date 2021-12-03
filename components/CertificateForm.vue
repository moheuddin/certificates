<template>
  <div>
    <v-container fluid>
      <div class="mb-10 flex items-center justify-between">
        <loader :loading="loading" />
        <div>
          <div class="flex flex-col">
            <h1 class="text-2xl font-bold">
              {{ editMode == true ? 'Edit' : 'Add New' }} certificate
            </h1>
            <p class="text-gray-500">Fill the form</p>
          </div>
        </div>
        <router-link
          class="bg-red-500 text-white p-2"
          :to="{
            path: '/admin/certificates/'
          }"
          ><svg
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
              d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
            /></svg
        ></router-link>
      </div>

      <form @submit.prevent="editMode ? updateData() : createData()">
        <v-row align="center">
          <v-col class="d-flex" cols="12" sm="9">
            <v-text-field
              v-model="form.ref"
              :counter="100"
              label="Reference"
              required
            ></v-text-field>
          </v-col>
          <v-col class="d-flex" cols="6" sm="3">
            <p><label for="date">Date</label></p>

            <input
              v-model="form.date"
              name="date"
              class="border-b-2 w-full"
              type="date"
            />
          </v-col>

          <v-col class="d-flex" cols="12" sm="3">
            <p><label for="certificate_type">Certificate Type</label></p>
            <model-select
              v-model="form.certificate_type"
              class="rounded"
              :options="certificateItems"
              placeholder="select Certificate Type"
            >
            </model-select>
          </v-col>
          <v-col class="d-flex" cols="6" sm="2">
            <v-checkbox
              v-model="onlyPdf"
              :label="`Only PDF: ${onlyPdf.toString()}`"
              @change="onlyPdf != onlyPdf"
            ></v-checkbox>
          </v-col>
        </v-row>
        <div v-if="!onlyPdf">
          <v-row align="center">
            <v-col class="d-flex" cols="12" sm="12">
              <v-text-field
                v-model="form.ped"
                :counter="100"
                label="Procuring Entity Details"
                required
              ></v-text-field>
            </v-col>
            <v-col class="d-flex" cols="12" sm="12">
              <v-text-field
                v-model="form.nameofworks"
                label="Name of Works/Goods/Service"
                hide-details="auto"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row align="center">
            <v-col class="d-flex" cols="12" sm="4">
              <v-text-field
                v-model="form.circle_division"
                label="Circle/Directorate"
              ></v-text-field>
            </v-col>

            <v-col class="d-flex" cols="12" sm="4">
              <v-text-field
                v-model="form.zone_region"
                :counter="10"
                label="Zone/Region"
              ></v-text-field>
            </v-col>
            <v-col class="d-flex" cols="12" sm="4">
              <v-text-field
                v-model="form.others"
                :counter="10"
                label="Others"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="d-flex" cols="12" sm="12">
              <v-textarea
                v-model="form.shortdescription"
                name="input-7-1"
                label="Short Description"
                value="form.shortdescription"
                hint="Hint text"
              ></v-textarea>
            </v-col>
          </v-row>

          <v-row>
            <v-col class="d-flex" cols="12" sm="6">
              <v-text-field
                v-model="form.ligal_title"
                class="d-flex"
                cols="12"
                sm="6"
                label="Contractor's/Consultant/Suppliers Ligal Title"
                required
              ></v-text-field>
            </v-col>
            <v-col class="d-flex" cols="12" sm="6">
              <v-text-field
                v-model="form.contact_details"
                class="d-flex"
                cols="12"
                sm="6"
                label="Contact Details"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="d-flex" cols="12" sm="6">
              <v-text-field
                v-model="form.ref_with_noa_with_date"
                class="d-flex"
                cols="12"
                sm="6"
                label="a) Reference of NOA/LOI no with Date"
                required
              ></v-text-field>
            </v-col>
            <v-col class="d-flex" cols="12" sm="6">
              <v-text-field
                v-model="form.revised_no_with_date"
                class="d-flex"
                cols="12"
                sm="6"
                label="b) Rrevised Ref. No with Date"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="d-flex" cols="12" sm="3">
              <v-text-field
                v-model="form.original_contact_price"
                class="d-flex"
                cols="12"
                sm="6"
                label="Original Contact Price In NOA"
                required
              ></v-text-field>
            </v-col>
            <v-col class="d-flex" cols="12" sm="3">
              <v-text-field
                v-model="form.revised_contact_price"
                class="d-flex"
                cols="12"
                sm="6"
                label="Final Contact Price As Deliverd"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="d-flex" cols="12" sm="12"
              ><P>Original Contact Period</P></v-col
            >

            <v-col class="d-flex" cols="12" sm="4">
              <p><label for="date">Date Commencement</label></p>

              <input
                v-model="form.date_of_commencement"
                class="border-b-2 w-full"
                type="date"
              />
            </v-col>
            <v-col class="d-flex" cols="12" sm="4">
              <p><label for="date">Date of Completion</label></p>

              <input
                id="date"
                v-model="form.date_of_completion"
                class="border-b-2 w-full"
                type="date"
              />
            </v-col>
            <v-col class="d-flex" cols="12" sm="4">
              <p><label for="date">Revised Date of Completion</label></p>

              <input
                id="date"
                v-model="form.revised_date_of_completion"
                class="border-b-2 w-full"
                type="date"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col class="d-flex" cols="12" sm="12">
              <p class="text-bold">Actual Implementation Period</p></v-col
            >

            <v-col class="d-flex" cols="12" sm="3">
              <p><label for="date">Actual Date of Completion</label></p>

              <input
                v-model="form.date_of_actual_commencement"
                name="date_of_actual_commencement"
                class="border-b-2 w-full"
                type="date"
              />
            </v-col>
            <v-col class="d-flex" cols="12" sm="3">
              <p><label for="date">Date of Extended Actual Period</label></p>

              <input
                v-model="form.date_of_extended_actula_period"
                name="date_of_extended_actula_period"
                class="border-b-2 w-full"
                type="date"
              />
            </v-col>
            <v-col class="d-flex" cols="12" sm="3">
              <v-text-field
                v-model="form.final_amount"
                class="d-flex"
                cols="12"
                sm="6"
                label="Final Amount"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="d-flex" cols="12" sm="12">
              <v-text-field
                v-model="form.location_of_works"
                class="d-flex"
                cols="12"
                sm="6"
                label="Location of Works"
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col class="d-flex" cols="12" sm="12"
              ><p>For substantial certificate only</p></v-col
            >
            <v-col class="d-flex" cols="12" sm="3">
              <v-text-field
                v-model="form.physicalprogress"
                class="d-flex"
                cols="12"
                sm="6"
                label="Physical Progress"
                required
              ></v-text-field>
            </v-col>
            <v-col class="d-flex" cols="12" sm="3">
              <v-text-field
                v-model="form.physicalprogresstilldate"
                class="d-flex"
                cols="12"
                sm="3"
                label="Physical Till Date"
                required
              ></v-text-field>
            </v-col>
            <v-col class="d-flex" cols="12" sm="3">
              <v-text-field
                v-model="form.financialprogress"
                class="d-flex"
                cols="12"
                sm="6"
                label="Financial Progress"
                required
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="form.financialprogresstilldate"
                class="d-flex"
                cols="12"
                sm="6"
                label="Physical Till Date"
              ></v-text-field>
            </v-col> </v-row
          ><v-row>
            <v-col>
              <v-textarea
                v-model="form.who_was_signed"
                name="input-7-1"
                label="Who was signed?"
                value="form.who_was_signed"
                hint="Hint text"
              ></v-textarea>
            </v-col>

            <v-col class="d-flex" cols="12" sm="3">
              <v-checkbox
                v-model="form.publish"
                class="d-flex"
                cols="12"
                sm="6"
                label="Publish?"
              ></v-checkbox>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="d-flex" cols="12" sm="12">
              <v-text-field
                v-model="form.special_note"
                class="d-flex"
                cols="12"
                sm="6"
                label="Special Note"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </div>

        <v-btn v-show="editMode" type="submit" class="">
          Update
          <v-progress-circular
            v-if="form.busy"
            indeterminate
            color="red"
          ></v-progress-circular>
        </v-btn>
        <v-btn v-show="!editMode" type="submit" class="" :disabled="form.busy">
          Create
          <v-progress-circular
            v-if="form.busy"
            indeterminate
            color="red"
          ></v-progress-circular>
        </v-btn>
        <v-btn @click="gotoIdenx"> Cancel </v-btn>
      </form>

      <div v-if="onlyPdf">
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
        <div>
          <button @click="createData">Start Upload</button>
          <!--  Upload progress : {{ progress }} -->
        </div>
      </div>
      <!--Show Selected Files-->
    </v-container>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex';
import Vue from 'vue';
import { Form, HasError, AlertError } from 'vform';

import 'vue-search-select/dist/VueSearchSelect.css';
import { ModelSelect } from 'vue-search-select';

// import axios from '~/plugins/axios';
import loader from '~/components/Loader.vue';
window.Form = Form;
Vue.component(HasError.name, HasError);
Vue.component(AlertError.name, AlertError);
Vue.component(HasError.name, HasError);
Vue.component(AlertError.name, AlertError);
export default {
  components: {
    ModelSelect,
    loader
  },
  layout: 'admin',
  props: { items: null },
  data() {
    return {
      id: null,
      certificateItems: [
        { value: 'Works', text: 'Works' },
        { value: 'Goods', text: 'Goods' },
        { value: 'Service', text: 'Service' }
      ],
      loading: false,
      onlyPdf: false,
      // errors: '',
      hasError: '',

      editMode: false,
      form: new Form({
        certificate_type: '',
        date: '',
        ref: '',
        id: '',
        ped: '',
        divission: '',
        circle_division: '',
        zone_region: '',
        others: '',
        nameofworks: '',
        shortdescription: '',
        ligal_title: '',
        contact_details: '',
        ref_with_noa_with_date: '',
        ref_with_noa_date2: '',
        original_contact_price: '',
        revised_contact_price: '',
        original_contact_period: '',
        date_of_commencement: '',
        date_of_completion: '',
        actual_delivery_period: '',
        date_of_actual_commencement: '',
        date_of_actual_completion: '',
        physicalprogress: '',
        physicalprogresstilldate: '',
        financialprogress: '',
        financialprogresstilldate: '',
        final_amount: '',
        who_was_signed: '',
        special_note: '',
        onlyPdf: '',
        file_name: '',
        publish: false
      }),
      files: [],
      options: ['Admin', 'Employee']
    };
  },
  computed: {
    /*     current() {

    } */
  },
  created() {
    this.id = this.$route.params.certificate_id;
    // console.log(this.$store.getters.getById(1));
    // console.log(this.$store.getters.itemsById[1]); //
    // console.log(this.$store.getters.getArrItem('1'));
    if (this.id != undefined) {
      this.getTodo();
    }
  },

  methods: {
    async getTodo() {
      // console.log(this.$axios);
      this.loading = true;
      if (this.id === undefined) {
        console.log('true');
        return false;
      }
      const res = await this.$axios.get('/certificates/' + this.id, {
        params: {}
      });
      console.log(res);
      if (res) {
        this.form.fill(res.data);
        this.editMode = true;
      }
      this.loading = false;
    },
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
    createData() {
      /*       const config = {
        onUploadProgress: (progressEvent) =>
          (this.progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          ))
      }; */
      this.loading = true;
      const config = {
        header: {
          'Content-Type': 'multipart/form-data'
        }
      };

      const formData = new FormData();
      Object.keys(this.form).forEach((key) => {
        formData.append(key, this.form[key]);
      });
      formData.append('files', this.files[0]);
      for (let i = 0; i < this.files.length; i++) {
        const file = this.files[i];
        formData.append('files[' + i + ']', file);
      }

      this.$axios
        .post('certificates/store', formData, config)
        .then((res) => {
          // this.progress = 0;
          // this.files = [];
          // console.log(res);
        })
        .catch((err) => console.log(err));
      this.loading = false;
    },

    selectFile(e) {
      console.log(e);
      const files = e.target.files || e.dataTransfer.files;
      if (!this.files.length) {
        return;
      }
      this.createImage(files[0]);
    },

    updateData() {
      this.createData();
    }
  }
};
</script>

<style>
.custom-file {
  padding: 1.2rem;
  border-radius: 0.8rem;
  display: inline-block;
  border: 2px dashed #a0a0a0;
}

.custom-file input {
  display: none;
}
.ui.selection.dropdown {
  min-height: 50px;
}
.ui.fluid.dropdown > .dropdown.icon {
  float: right;
  font-size: 16px;
}
.ui.search.dropdown > .text {
  padding: 5px;
}
input[type='date'] {
  border-bottom: 1px solid #777;
}
input[type='date']::-webkit-calendar-picker-indicator {
  filter: invert(100%);
}
input[type='date'] {
  position: relative;
}

/* create a new arrow, because we are going to mess up the native one
see "List of symbols" below if you want another, you could also try to add a font-awesome icon.. */
input[type='date']:after {
  font-family: 'Font Awesome 5 Free';
  font-weight: 900;
  content: '\f073';
  color: #555;
  padding: 0 5px;
}
</style>
