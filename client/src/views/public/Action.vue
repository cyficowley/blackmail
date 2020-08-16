<template>
  <v-app>
    <v-content>
      <v-container fluid class="fullwindow" style="z-index:0;">
        <v-row id="landing-row" class="fullwindow">
          <v-col class="forward colParent" cols="12" md="4">
            <div v-if="verifyMode" class="title-card">
              <v-card class="card" style="padding:20px;text-align:left">
                <h1>VERIFYING EMAIL</h1>
                <p>You will be redirected on completion</p>
                <p>Click <a href="https://blackmailer.xyz/#/home">here</a>
                to manually redirect if you aren't automatically redirected in a few seconds</p>
              </v-card>
            </div>
            <div v-else class="title-card">
              <v-card class="card" style="padding:20px;text-align:left">
                <change-password />
              </v-card>
            </div>
          </v-col>

          <div class="stripe2"></div>
          <div class="stripe"></div>
        </v-row>
        <v-row id="row2" class="forward light-2">
          <v-container>
            <v-row>
              <v-col class="forward" cols="12" xl="10"></v-col>
              <v-spacer></v-spacer>
            </v-row>
          </v-container>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>


<script>
import ChangePassword from '@/components/modal/ChangePassword.vue';
import fb from '@/plugins/firebase';

export default {
  name: 'Action',

  data: () => ({
    verifyMode: false,
  }),

  components: {
    ChangePassword,
  },

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

<style scoped>
.fullwindow {
  padding-top: 0;
  padding-bottom: 0;
  height: 100vh;
}

.title-card {
  padding: 20px;
  padding-top: 80px;
  margin-left: auto;
  margin-right: auto;
}

.stripe {
  width: 100vw;
  height: 50vh;
  position: absolute;
  left: 0;
  bottom: 0;
  background-image: linear-gradient(
    to right bottom,
    rgba(0, 0, 0, 0) 50%,
    var(--blackmailer-blue-2) 50%
  );
}
.stripe2 {
  width: 70vw;
  height: 70vh;
  position: absolute;
  left: 0;
  bottom: 0;
  background-image: linear-gradient(
    to left bottom,
    rgba(0, 0, 0, 0) 50%,
    var(--blackmailer-blue-1) 50%
  );
}
.forward {
  z-index: 2;
}

#landing-row {
  background-image: linear-gradient(to bottom,
    var(--blackmailer-blue-1),
    var(--blackmailer-blue-2));
  /* background-image: url("../assets/landing.jpg");
    background-size: cover; */
}
.bigTitle {
  font-size: 100px;
  padding-left: 20px;
}

p {
  color: black;
  font-size: 1.2em;
}
.colParent {
  margin: 0 auto;
}

@media only screen and (max-width: 1263px) {
  .fullwindow {
    height: auto !important;
    position: relative;
  }

  .title-card {
    padding: 10px;
  }
}
</style>
