<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <hero-bar>
      Profile
      <nuxt-link slot="right" to="/" class="button"> Dashboard </nuxt-link>
    </hero-bar>
    <section class="section is-main-section">
      <tiles>
        <profile-update-form class="tile is-child" />
        <card-component title="Profile" icon="account" class="tile is-child">
          <user-avatar class="image has-max-width is-aligned-center" />
          <hr />
          <b-field label="Name">
            <b-input :value="user.name" custom-class="is-static" readonly />
          </b-field>
          <hr />
          <b-field label="E-mail">
            <b-input :value="user.email" custom-class="is-static" readonly />
          </b-field>
        </card-component>
      </tiles>
      <password-update-form />
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex';
/* import CardComponent from '@/components/CardComponent'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import ProfileUpdateForm from '@/components/ProfileUpdateForm'
import PasswordUpdateForm from '@/components/PasswordUpdateForm'
import Tiles from '@/components/Tiles'
import UserAvatar from '@/components/UserAvatar' */
export default {
  name: 'Profile',
  components: {
    /* UserAvatar,
    Tiles,
    PasswordUpdateForm,
    ProfileUpdateForm,
    HeroBar,
    TitleBar,
    CardComponent, */
  },
  computed: {
    titleStack() {
      return ['Admin', 'Profile'];
    },
    user() {
      return this.$store.state.auth.user;
    },
    ...mapState(['userName', 'userEmail'])
  },
  head() {
    return {
      title: 'Profile'
    };
  }
};
</script>
