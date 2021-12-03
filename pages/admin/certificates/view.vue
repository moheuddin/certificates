<template lang="">
  <div>
    <div class="flex items-center justify-between border-b-2">
      <h1 class="text-3xl font-bold">Certificate View</h1>
      <div>
        <nuxt-link
          to="/admin/certificates"
          class="focus:outline-none text-gray-500 hover:text-gray-900"
        >
          <div class="flex items-center gap-5">
            <p class="font-semibold">
              <i class="text-2xl text-red-600 fa fa-home"></i>
            </p>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CertificateView',
  components: {},
  layout: 'admin',
  mounted() {
    console.log(this.$route.query.id);
  }
};
</script>
