<template>
  <v-app>
    <v-content>
      <v-card class="w-full">
        <v-card-title> Login </v-card-title>

        <div v-if="loginForm.errors.errors.account" class="alert alert-danger">
          {{ loginForm.errors.errors.account[0] }}
        </div>
        <form
          @submit.prevent="userLogin"
          @keydown="loginForm.onKeydown($event)"
        >
          <v-card-text>
            <div>
              <v-text-field
                v-model="loginForm.email"
                type="text"
                class="form-control"
                name="email"
                placeholder="Enter email"
                :class="{ 'is-invalid': loginForm.errors.has('email') }"
                label="Your E-Mail"
              >
              </v-text-field>

              <has-error :form="loginForm" field="email"></has-error>
            </div>
            <div>
              <v-text-field
                v-model="loginForm.password"
                type="password"
                label="Password"
                name="passwrd"
                :class="{ 'is-invalid': loginForm.errors.has('password') }"
              >
              </v-text-field>
              <has-error :form="loginForm" field="password"></has-error>
            </div>
          </v-card-text>

          <v-card-actions>
            <v-btn
              color="primary"
              :disabled="loginForm.busy"
              type="submit"
              class="button is-primary"
            >
              Login
              <v-progress-circular
                v-if="loginForm.busy"
                indeterminate
                color="red"
              ></v-progress-circular>
            </v-btn>
          </v-card-actions>
          <v-card-actions>
            <v-row class="flex">
              <v-col md="6" justify="center">
                <nuxt-link :to="{ name: 'register' }"
                  >Don't have account?</nuxt-link
                >
              </v-col>
              <v-col md="6" justify="center">
                <nuxt-link :to="{ name: 'forgot' }">Forgot?</nuxt-link>
              </v-col>
            </v-row>
          </v-card-actions>
        </form>
      </v-card>
    </v-content>
  </v-app>
</template>

<script>
import 'vuetify/dist/vuetify.min.css'; // Ensure you are using css-loader

export default {
  layout: 'auth',
  data() {
    return {
      loginForm: this.$vform({
        action: 'login',
        email: 'admin@admin.com',
        password: 'admin123'
      })
    };
  },

  mounted() {
    // console.log(process.env.APP_NAME)
  },
  methods: {
    async userLogin() {
      try {
        const { data } = await this.loginForm.post('/login');
        // await this.$auth.setUserToken(data.data.access_token)
        // console.log(data.data.access_token);
        this.success = true;
        await this.$auth.setUserToken(data.data.access_token);
        this.$store.commit('user', this.$auth.user);
        this.loginForm.reset();
        this.$router.push('/admin/dashboard');
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>
