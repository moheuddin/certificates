<template>
  <footer class="footer">
    <div class="container">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <div class="footer-copyright">
              <p class="text-black">
                &copy; Bangladesh Bridge Authority, All Rights resrved.<br />Develop
                & Maintain By: Bangladesh Bridge Authority ICT Cell
              </p>
            </div>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <div class="logo">
              <a href="https://bba.gov.bd"
                ><img class="w-10" :src="require(`@/assets/bbalogo.png`)"
              /></a>
              <p class="text-center text-1xl">
                Bangladesh Bridge Authority Facebook Page
                <a
                  href="https://www.facebook.com/bridgeauthority"
                  target="_blank"
                  ><img
                    src="https://eservice.bba.gov.bd/recruitment/img/fb.jpg"
                /></a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import dayjs from 'dayjs';
// import { mapState } from 'vuex';

export default {
  name: 'FooterBar',
  computed: {
    year() {
      return dayjs().year();
    }
    // ...mapState(['isFooterBarVisible'])
  }
};
</script>
<style scoped>
footer {
  clear: both;
}
</style>
