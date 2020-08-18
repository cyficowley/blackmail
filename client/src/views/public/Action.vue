<template>
  <striped-transition>
    <div :class="$style.component">
      <div
        v-if="verifyMode"
        :class="$style['card-wrapper']">
        <v-card :class="$style.card">
          <h1>
            VERIFYING EMAIL
          </h1>

          <p>
            You will be redirected on completion.
          </p>

          <p>
            Click
            <a href="https://blackmailer.xyz/#/home">
              here
            </a>
            to manually redirect if you aren't automatically redirected in a few seconds
          </p>
        </v-card>
      </div>

      <div
        v-else
        :class="$style['card-wrapper']">
        <v-card :class="$style.card">
          <change-password />
        </v-card>
      </div>
    </div>
  </striped-transition>
</template>


<script>
import StripedTransition from '@/components/misc/StripedTransition.vue';
import ChangePassword from '@/components/modal/ChangePassword.vue';
import fb from '@/plugins/firebase';

export default {
  name: 'Action',
  components: {
    ChangePassword,
    StripedTransition,
  },
  data: () => ({
    verifyMode: false,
  }),
  created() {
    this.mode = this.getUrlVal('mode');
    if (this.mode === 'verifyEmail') {
      this.verifyMode = true;
      this.verify();
    }
  },
  methods: {
    getUrlVal(field, url) {
      const href = url || window.location.href;
      const reg = new RegExp(`[?&]${field}=([^&#]*)`, 'i');
      const string = reg.exec(href);
      return string ? string[1] : null;
    },
    async verify() {
      try {
        this.urlCode = this.getUrlVal('oobCode');
        await fb.auth.applyActionCode(this.urlCode);
        await fb.auth.currentUser.reload();
        this.$store.commit('setCurrentUser', fb.auth.currentUser);
        this.$router.push('/home?snackbar=emailVerified');
      } catch (err) {
        this.errorMsg = err.message;
        console.log(err);
      }
    },
  },
};
</script>

<style module>
.component {
  align-items: center;
  background-image: linear-gradient(to bottom,
    var(--blackmailer-blue-1),
    var(--blackmailer-blue-2));
  display: flex;
  height: 100vh;
  justify-content: center;
  width: 100vw;
}

.card-wrapper {
  padding: 20px;
  padding-top: 80px;
  margin-left: auto;
  margin-right: auto;
}

.card {
  padding: 20px;
  text-align: left;
}

.component p {
  color: black;
  font-size: 1.2em;
}
</style>
