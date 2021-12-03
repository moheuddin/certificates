<template>
  <div class="h-screen flex">
    <!-- Fixed sidebar -->
    <Sidebar :bool="close" @close="close = true" />
    <!-- Scroll wrapper -->
    <div class="flex-1 flex overflow-hidden">
      <!-- Scrollable container -->
      <div class="flex-1 overflow-y-scroll">
        <div class="flex items-center justify-between md:justify-end px-6 py-2">
          <button class="focus:outline-none md:hidden" @click="toggle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </button>
          <nuxt-link
            to="/admin/profile"
            class="flex items-center p-2 hover:bg-gray-100 rounded-full"
          >
            <img
              class="h-5 w-10 md:h-12 md:w-12 rounded-full"
              src="https://avatars.githubusercontent.com/u/39481226?v=4"
              alt="Zdeněk"
            />
            <div class="ml-4 hidden md:block">
              <p v-if="loggedIn">Hello {{ user.name }}</p>
              <p v-if="!loggedIn">Please sign in</p>
            </div>
          </nuxt-link>
        </div>
        <div class="px-6">
          <Nuxt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      close: true
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.loggedIn;
    },
    user() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    toggle() {
      this.close = !this.close;
    }
  }
};
</script>
