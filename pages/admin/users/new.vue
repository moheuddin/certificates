<template>
  <div>
    <div class="mb-10 flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold">Add new user</h1>
        <p class="text-gray-500">Fill the form</p>
      </div>
    </div>

    <UserForm />
  </div>
</template>

<script>
import UserForm from '~/pages/admin/users/_id.vue';
export default {
  components: { UserForm },
  layout: 'admin',
  data() {
    return {
      options: ['Admin', 'Employee', 'Basic']
    };
  }
};
</script>

<style></style>
