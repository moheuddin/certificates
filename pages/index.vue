<template>
  <div>
    <div class="container flex place-content-end justify-items-end">
      <router-link
        class="bg-red-500 text-white p-2 hover:bg-green-600 rounded"
        :to="{
          path: '/help'
        }"
        ><svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M11,18H13V16H11V18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,6A4,4 0 0,0 8,10H10A2,2 0 0,1 12,8A2,2 0 0,1 14,10C14,12 11,11.75 11,15H13C13,12.75 16,12.5 16,10A4,4 0 0,0 12,6Z"
          />
          Help
        </svg>
      </router-link>
    </div>

    <v-container>
      <loader :loading="loading" />
      <div v-if="!defaultPage">
        <div class="flex place-content-center gap-10">
          <v-btn @click="defaultPage = !defaultPage">
            <v-icon large color="primary">fa-home</v-icon>
          </v-btn>
          <v-btn @click="printMe">
            <v-icon color="primary" large>fa-print</v-icon>
          </v-btn>
        </div>
        <ServiceCiertificate id="printMe" :items="items" :qrcode="qrcode" />
      </div>
    </v-container>

    <div v-if="defaultPage" class="md:mx-auto">
      <v-app>
        <v-main>
          <v-container>
            <v-card class="mx-auto" max-width="600">
              <div v-if="error" class="alert alert-danger">
                <v-alert
                  v-if="!valid"
                  class="noprint"
                  border="bottom"
                  color="info"
                  close-icon="x"
                >
                  {{ error }}
                </v-alert>
              </div>
              <form>
                <v-card-text>
                  <div>
                    <v-text-field
                      v-model="verifyForm.varificationId"
                      placeholder="Enter Completion Certificate Memo No"
                      :rules="Rules"
                      label="Certificate ID"
                      required
                    >
                    </v-text-field>
                  </div>
                </v-card-text>

                <v-card-actions>
                  <v-btn
                    color="primary"
                    :disabled="verifyForm.busy"
                    @click="verifyCertificate"
                  >
                    Verify
                    <v-progress-circular
                      v-if="verifyForm.busy"
                      indeterminate
                      color="red"
                    ></v-progress-circular>
                  </v-btn>
                </v-card-actions>
              </form>
            </v-card>
          </v-container>
        </v-main>
      </v-app>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
// import Qrcode from 'v-qrcode/src/index';

// import { Form, HasError, AlertError } from 'vform';
import { Form } from 'vform';

import 'vue-search-select/dist/VueSearchSelect.css';
import VueHtmlToPaper from 'vue-html-to-paper';
import loader from '~/components/Loader.vue';
import ServiceCiertificate from '~/components/certificate-service.vue';
// import axios from '~/plugins/axios';
// import Loading from '~/components/Loading.vue';
window.Form = Form;

const options = {
  name: '_blank',
  specs: ['fullscreen=no', 'titlebar=yes', 'scrollbars=yes'],
  styles: ['https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css']
};

Vue.use(VueHtmlToPaper, options);
export default {
  // auth: 'guest',
  name: 'Home',
  components: {
    ServiceCiertificate,
    loader
    // Qrcode
    //  Notification
  },
  data() {
    return {
      defaultPage: true,
      qrcode: '',
      error: '',
      valid: false,
      loading: false,
      token: '',
      items: null,
      Rules: [
        (v) => !!v || 'Verification ID is required',
        (v) =>
          v.length >= 10 || 'Verification ID must be less than 4 characters'
      ],
      output: null,
      validCertificate: false,
      qrCls: 'qrcode',
      qrText: 'Read VueJS Feed daily',
      size: 100,
      background: '#E91E63',
      verifyForm: this.$vform({
        varificationId: '50.01.0000.401.42.020.18-619'
      })
    };
  },
  head() {
    return {
      title: 'Bangladesh Bridge Authorioty — Verify Certificate'
    };
  },

  computed: {
    titleStack() {
      return ['Varify Certificate', ''];
    },
    singleItem() {
      return this.$store.state.singleItem;
    }
  },
  created() {
    const token = this.$route.query.token;
    this.token = token;
    if (typeof this.token === 'undefined') {
      console.log('test');
      return false;
    }

    this.verifyCertificate();
  },
  methods: {
    printMe() {
      this.$htmlToPaper('printMe');
    },

    async verifyCertificate() {
      // try {
      /* const { res } = await this.$axios.get('certificateVerify', {
          params: { id: this.verifyForm.varificationId }
        }); */
      let setToken = '';
      if (typeof this.token !== 'undefined') {
        setToken = this.token;
      } else if (this.verifyForm.varificationId !== '') {
        setToken = this.verifyForm.varificationId;
      } else {
        return;
      }

      this.loading = true;
      const res = await this.$axios.get('certificateVerify', {
        params: { id: setToken }
      });
      // console.log(res.data.qrcode);
      this.qrcode = res.data.qrcode;
      console.log(res.data.status);
      if (res.data.result[0]) {
        // this.$store.dispatch('setSingleItem', res.data.result[0]);
        this.items = res.data.result[0];
        this.defaultPage = false;
        this.valid = true;
      } else {
        this.defaultPage = true;
        this.valid = false;
        this.error =
          'Requested certificate not found! Please enter valid Certificate Number';
      }
      this.loading = false;
    }
  }
};
</script>

<style>
@media print {
  .noprint,
  footer,
  #header {
    visibility: hidden;
  }
  .certificate {
    margin: 0 !important;
  }
}
@media only screen and (max-width: 640px) {
  td,
  p {
    font-size: 10px;
    padding: 1px;
    line-height: 1.5;
  }

  h1,
  h2,
  h3 {
    font-size: 14px;
    line-height: 1.3em;
  }
  img {
    max-width: 80px;
  }
}
</style>
