<template>
  <div id="header" class="bg-green-400" style="margin-top: -8px">
    <div class="container justify-center mt-2">
      <div class="grid grid-cols-12 gap-0">
        <div class="...">
          <img class="logo-left" :src="require(`@/assets/bd_logo.png`)" />
        </div>
        <div class="col-span-10">
          <h1 class="text-center font-black lg:text-4xl sm:text-2xl">
            Bangladesh Bridge Authority
          </h1>
          <p class="text-center lg:text-3xl">
            Experience Certificates Verification System
          </p>
        </div>
        <div class="...">
          <img
            class="logo-right float-right"
            :src="require(`@/assets/bbalogo.png`)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//  import { mapState } from 'vuex';

export default {
  name: 'HeaderBar',
  computed: {},
  created() {}
};
</script>
<style>
.header {
  background-color: #ddd;
}
.header div {
  text-align: center;
}
.logo-left {
  display: block;
  float: let;
}
/* Big smartphones (portrait) (ie: Galaxy 3 has 360)*/
@media only screen and (max-width: 640px) {
  .logo-left,
  .logo-right {
    width: 50px;
  }
}
</style>
