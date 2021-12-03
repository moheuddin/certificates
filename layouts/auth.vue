<template>
  <div class="h-screen md:flex">
    <!-- Fixed sidebar -->

    <div
      class="
        hidden
        md:block
        bg-gray-600
        w-4/12
        h-screen
        text-white text-center text-lg
        rounded-r-2xl
      "
    >
      <div class="bg-white flex justify-center border-2">
        <img class="" :src="require(`@/assets/bbalogo.png`)" />
      </div>
      <p class="py-10">
        Bangladesh Bridge Authority Online Experience Certificate Verification
        System login
      </p>
      <!-- Sidebar content -->
    </div>
    <!-- Scroll wrapper -->
    <div class="flex-1 flex overflow-hidden">
      <!-- Scrollable container -->
      <div class="flex-1 overflow-y-scroll">
        <div class="flex h-screen">
          <div class="m-auto w-8/12">
            <Nuxt />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
